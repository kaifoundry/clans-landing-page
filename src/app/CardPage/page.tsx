'use client';

import Button from '@/components/Button';
import { useEffect, useState, useRef, useMemo, Suspense } from 'react';
import { useClan } from '@/context/ClanContext';
import { toCanvas } from 'html-to-image';
import ClanCard from '@/components/ClanCard';
import toast from 'react-hot-toast';
import Loader from '@/components/Features/Loader';
import { selectClansData } from '@/data/clansData';
import ClanCardMobile from '@/components/ClanCardMobile';
import { ENV } from '@/constant/envvariables';
import { useRouter } from 'next/navigation';
import { TwitterPostModal } from '@/components/twitter-post-modal';

// Example usage

export default function CardPage() {
  return (
    <Suspense
      fallback={<Loader message='Loading your selected Clan please wait...' />}
    >
      <CardPageContent />
    </Suspense>
  );
}

function CardPageContent() {
  const {
    clans,
    loading: clansLoading,
    error,
    selectedCardId,
    setSelectedCardId,
    joinClan,
    fetchClans,
  } = useClan();
  const [loading, setLoading] = useState(false);
  const [tweetPosted, setTweetPosted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingClanId, setPendingClanId] = useState<string | null>(null);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [card, setCard] = useState<null | {
    id: string;
    title: string;
    description: string;
    image: string;
    sideImage: string;
    glowColor: string;
    // cardCharacter:string;
  }>(null);

  const cardRefDesktop = useRef<HTMLDivElement>(null);
  const cardRefMobile = useRef<HTMLDivElement>(null);

  const [userData, setUserData] = useState<null | {
    userId: string;
    displayName: string;
    referralCode?: string;
    followers: string;
    socialHandles?: {
      username: string;
      profilePicture: string;
      displayName: string;
    }[];
  }>(null);

  const profilePic = userData?.socialHandles?.[0]?.profilePicture;

  const cardData = useMemo(() => {
    const mappedData = Array.isArray(clans)
      ? clans.map((clan, index) => ({
          id: clan.clanId,
          title: clan.title,
          description: clan.description,
          image: clan.banner || '',
          sideImage: selectClansData[index]?.selectImage || '',
          glowColor: selectClansData[index]?.glowColor || '#6366f1',
        }))
      : [];
    return mappedData;
  }, [clans]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token !== 'NA') {
      fetchClans(token);
    } else {
      console.warn('Waiting for authentication token...');
    }
  }, []);

  useEffect(() => {
    if (!selectedCardId && cardData.length > 0) {
      try {
        const storedCardId = localStorage.getItem('selectedCardId');
        if (storedCardId) {
          setSelectedCardId(storedCardId);
          return;
        }
      } catch (err) {
        console.error('Error reading from localStorage:', err);
      }
    }

    if (selectedCardId !== null) {
      const selected = cardData.find(
        (card) => card.id === selectedCardId.toString()
      );
      if (selected) {
        setCard(selected);
      } else {
        setCard(cardData[0]);
      }
    } else if (cardData.length > 0) {
      setCard(cardData[0]);
    }
  }, [selectedCardId, cardData, setSelectedCardId]);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
  useEffect(() => {
    const storedId = localStorage.getItem('joinedClanId');
    if (storedId) {
      setPendingClanId(storedId);
    }
  }, []);
  if (!card || !cardData.length) {
    return <Loader message='Loading your selected Clan please wait...' />;
  }

  const tweetContent = `Roar louder. Roar prouder. Pick your clan!

${ENV.NEXT_PUBLIC_X_HANDLER} is shaping the attention economy for roarers. 

The battlegrounds have just opened.
I've claimed my clan and started stacking my Roar Points. 

Claim your clan today 👉 ${ENV.NEXT_PUBLIC_API_BASE_URL}/referral/${userData?.referralCode}`;

  const ConvertToImage = async (cardNode: HTMLDivElement) => {
    try {
      const isMobile = window.innerWidth < 1024;
      const pixelRatio = isMobile ? 2.5 : 1;
      var newCanvas = await toCanvas(cardNode, {
        quality: 1,
        pixelRatio: pixelRatio,
      });
      var base64 = newCanvas.toDataURL();
      return base64;
    } catch (error) {
      console.error('error in generation of image', error);
      console.error('error in generation of image', error);
      return '';
    }
  };

  const handleStartRoaring = async (): Promise<boolean> => {
    if (!cardRefDesktop.current && !cardRefMobile.current) {
      toast.error('Card reference not available');
      return false;
    }

    if (!userData) {
      toast.error('User data not available');
      return false;
    }

    try {
      setLoading(true);

      const isMobile = window.innerWidth < 1024;
      const cardNode = isMobile
        ? cardRefMobile.current
        : cardRefDesktop.current;
      if (!cardNode) {
        toast.error('Card reference not available');
        return false;
      }
      const rect = cardNode.getBoundingClientRect();

      const buildPng = async () => {
        const element = document.getElementById('image-node');

        var dataUrl = '';
        const minDataLength = 2000000;
        let i = 0;
        const maxAttempts = 10;
        while (dataUrl.length < minDataLength && i < maxAttempts) {
          dataUrl = await ConvertToImage(cardNode);
          i += 1;
        }
        return dataUrl;
      };

      const dataUrl = await buildPng();
      const res = await fetch(dataUrl ? dataUrl : '');
      const blob = await res.blob();

      const file = new File(
        [blob],
        `card-${card?.title?.replace(/\s+/g, '-').toLowerCase()}.png`,
        { type: 'image/png' }
      );

      const formData = new FormData();
      formData.append('media', file);

      const token = localStorage.getItem('token') || 'NA';

      const uploadResponse = await fetch(
        `${ENV.NEXT_PUBLIC_API_BACKEND_URL}/api/V2/twitter/upload-media/${userData.userId}`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(
          `Failed to upload image: ${uploadResponse.status} ${errorText}`
        );
      }

      const uploadResult = await uploadResponse.json();

      if (!uploadResult.success || !uploadResult.mediaId) {
        throw new Error(`Media upload failed: ${JSON.stringify(uploadResult)}`);
      }

      const tweetData = {
        userId: userData.userId,
        text: tweetContent,
        mediaId: uploadResult.mediaId,
        referralCode: userData.referralCode || '',
      };

      const tweetResponse = await fetch(
        `${ENV.NEXT_PUBLIC_API_BACKEND_URL}/api/V2/twitter/tweet`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(tweetData),
        }
      );
      if (!tweetResponse.ok) {
        const errorText = await tweetResponse.text();
        throw new Error(
          `Failed to post tweet: ${tweetResponse.status} ${errorText}`
        );
      }

      const tweetResult = await tweetResponse.json();

      if (!tweetResult.tweetId && !tweetResult.tweetData?.tweetId) {
        throw new Error(`No tweet ID received: ${JSON.stringify(tweetResult)}`);
      }

      localStorage.setItem(
        'tweetData',
        JSON.stringify({
          tweetId: tweetResult.tweetId || tweetResult.tweetData?.tweetId,
          userId: userData.userId,
        })
      );

      setTweetPosted(true);
      // toast.success('Tweet posted successfully!');
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Failed to complete the process');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmJoin = async (): Promise<boolean> => {
    const userData = localStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : null;
    const storedUserId = user?.userId;
    const pendingClanId = localStorage.getItem('joinedClanId');

    if (!storedUserId || !pendingClanId) {
      toast.error('Missing user or clan ID.');
      return false;
    }

    try {
      const success = await joinClan({
        userId: storedUserId,
        clanId: pendingClanId,
      });

      if (success) {
        setSelectedCardId(pendingClanId);
        return true;
      }

      // toast.error('You have already joined the clan.');
      return false;
    } catch (error) {
      toast.error('Failed to join clan due to network or server error.');
      return false;
    }
  };

  const handleJoinBoth = async () => {
    setIsLoading(true);

    try {
      const clanSuccess = await handleConfirmJoin();
      if (clanSuccess) {
        const waitlistSuccess = await handleStartRoaring();
        if (waitlistSuccess) {
          toast.success(
            "Your tweet was posted successfully, and you've joined the clan!"
          );
        } else {
          toast.error('Failed to post tweet. Please try again.');
        }
      } else {
        toast.error('Failed to join the clan. Please try again.');
      }
    } catch (error) {
      toast.error('Unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = () => {
    const tweetData = JSON.parse(localStorage.getItem('tweetData') || '{}');
    const userId = userData?.userId || '';
    const tweetId = tweetData.tweetId || '';
    window.location.href = `/JoinWaitlist/${userId}/${tweetId}`;
  };

  let userFollowers = localStorage.getItem('followers') || '0';

  return (
    <section
      className='relative flex h-screen flex-col items-center justify-center overflow-hidden bg-black p-2 sm:p-4'
      style={{
        backgroundImage: "url('/Images/cardPage/cardBg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* <Toaster position="top-center" /> */}
      <div className='absolute inset-0 z-0 bg-black/60' />
      <div className='relative z-10 mt-5 flex w-full max-w-6xl flex-col items-center justify-center px-2 py-3 sm:px-5 sm:py-5'>
        <h1 className='mb-3 px-10 text-center text-2xl font-bold text-white sm:mb-10 sm:px-0 sm:text-3xl md:text-4xl'>
          You are now certified{' '}
          <span style={{ color: card.glowColor }}>Clans Roarer</span>!
        </h1>
        <div className='hidden lg:block'>
          <ClanCard
            ref={cardRefDesktop}
            glowColor={card.glowColor}
            title={card.title}
            description={card.description}
            sideImage={card.sideImage}
            userId={userData?.userId || ''}
            profilePic={profilePic}
            displayName={userData?.socialHandles?.[0]?.displayName}
            username={userData?.socialHandles?.[0]?.username}
            followers={userFollowers}
          />
        </div>
        <div className='block lg:hidden'>
          <ClanCardMobile
            ref={cardRefMobile}
            glowColor={card.glowColor}
            title={card.title}
            description={card.description}
            sideImage={card.sideImage}
            userId={userData?.userId || ''}
            profilePic={profilePic}
            displayName={userData?.socialHandles?.[0]?.displayName}
            username={userData?.socialHandles?.[0]?.username}
            followers={userFollowers}
          />
        </div>
        <div className='mt-5 flex flex-col items-center justify-center gap-5 md:flex-row'>
          <Button
            ButtonText={loading ? 'Processing...' : 'Start Roaring'}
            // onClick={handleJoinBoth}
            onClick={openModal}
            className='px-4 py-2 text-lg'
            disabled={loading || tweetPosted}
            width={250}
            height={70}
          />
          <Button
            ButtonText='Continue'
            onClick={handleRedirect}
            className='px-4 py-2 text-lg'
            width={250}
            height={70}
            disabled={!tweetPosted}
          />
        </div>
      </div>
      <TwitterPostModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleJoinBoth}
        glowColor={card.glowColor}
        title={card.title}
        description={card.description}
        sideImage={card.sideImage}
        profilePic={profilePic}
        displayName={userData?.socialHandles?.[0]?.displayName}
        username={userData?.socialHandles?.[0]?.username}
        followers={userFollowers}
      />
    </section>
  );
}
