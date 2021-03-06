import { useAppDispatch, useAppSelector } from '@/config/Redux/hooks';
import {
  selectShowReel,
  setShowReelCurrentCategory,
  setShowReelData,
  setCurrentPlayVideo,
} from '@/config/Redux/slices/showReelSlice';
import { useShowReels } from '@/hooks/api/app';
import { ShowReel, ShowReelItem } from '@/types/res';
import React, { useEffect, useState } from 'react';

function Showreel() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [menuId, setMenuId] = useState<string>('');
  // const [currentVideo, setCurrentVideo] = useState<ShowReelItem>();
  const { data, isLoading: isLoadingData } = useShowReels();

  const { showReelData, showReelCurrentCategory, showReelCurrentPlay } =
    useAppSelector(selectShowReel);

  // console.log(state);

  const dispatch = useAppDispatch();

  // console.log(data);

  useEffect(() => {
    dispatch(setShowReelData(data));
    setIsLoadingImage(true);
    setTimeout(() => {
      setIsLoadingImage(false);
    }, 1000);
  }, [dispatch, data]);

  useEffect(() => {
    if (showReelData?.length > 0) {
      setMenuId(showReelData[0]._id);
    }
  }, [showReelData]);

  useEffect(() => {
    setIsLoading(true);
    setIsLoadingImage(true);
    if (menuId) {
      const getShowReelByCategoryId = data?.find(
        (item: ShowReel) => item._id === menuId
      );
      dispatch(setShowReelCurrentCategory(getShowReelByCategoryId));
      dispatch(setCurrentPlayVideo(getShowReelByCategoryId?.data[0]));
      setTimeout(() => {
        setIsLoadingImage(false);
        setIsLoading(false);
      }, 1000);
    }
  }, [menuId, dispatch]);
  const handleMenuId = (id: string) => {
    setMenuId(id);
  };

  // console.log('showReelCurrentPlay', showReelCurrentPlay?._id);
  const handleCurrentVideo = (video: ShowReelItem) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    dispatch(setCurrentPlayVideo(video));
  };
  // return <h1>hello</h1>;

  return (
    <section className="relative bg-main-color batas-suci text-text-color">
      <div className="py-20">
        <div className="title lg:text-right text-center px-16">
          <h2 className="lg:text-3xl text-2xl font-bold uppercase mb-6">
            Showreel
          </h2>
          <p className="text-sm sm:text-base">Salah Satu Hasil Karya Kami</p>
        </div>
        <div className="grid md:grid-cols-3 mt-8 gap-3 md:gap-2 lg:gap-6 justify-between ">
          <div className="video-player-sec md:col-span-2 ">
            <div className=" relative showreel-menu px-5">
              <div className="video-menu-item flex gap-5 justify-center items-center pb-6">
                {showReelData?.map(item => (
                  <button
                    className={
                      showReelCurrentCategory?._id === item._id
                        ? 'relative text-2xl h-8 font-semibold duration-500 text-my-orange'
                        : 'relative font-light h-8 duration-500'
                    }
                    key={item._id}
                    onClick={() => handleMenuId(item._id)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="video-embed-cont overflow-hidden relative w-full after:pt-[56.25%] after:block rounded-2xl cursor-auto border-8">
                <div className="w-full h-full absolute top-0 left-0">
                  {isLoadingData ||
                    (isLoading && (
                      <div className="w-full h-full flex items-center justify-center">
                        <LoadingVideo />
                      </div>
                    ))}
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${showReelCurrentPlay?.video_id}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 mt-[56px] hidden md:block">
            <div className="relative showreel-menu px-5 overflow-y-scroll h-full space-x-5 scrollbar">
              <div className="absolute left-0 top-0 video-menu-item grid grid-cols-2 grid-rows-4 overflow-hidden md:gap-2 lg:gap-5 justify-center items-center pb-6 pr-5">
                {showReelCurrentCategory?.data?.map(item => (
                  <div
                    className="relative rounded-md showreel-item-img cursor-pointer overflow-hidden"
                    key={item._id}
                    onClick={() => handleCurrentVideo(item)}
                  >
                    <img
                      // src="https://via.placeholder.com/480x270"
                      src={`https://img.youtube.com/vi/${item.video_id}/mqdefault.jpg`}
                      alt={item.title}
                      className={` relative rounded-md showreel-item-img cursor-pointer ${
                        showReelCurrentPlay?.video_id === item.video_id
                          ? 'brightness-[20%]'
                          : 'hover:brightness-100'
                      }`}
                    />
                    <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
                      {isLoadingImage && (
                        <div className=" absolute top-0 left-0 w-full h-full bg-black flex justify-center items-center">
                          <LoadingVideo />
                        </div>
                      )}
                      {showReelCurrentPlay?.video_id === item.video_id ? (
                        <p>Now Playing...</p>
                      ) : (
                        <p className="text-gray-500 hover:text-my-orange h-full w-full flex justify-center items-center duration-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 bg-white rounded-full"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="carousel md:hidden carousel-center w-full p-4 space-x-4 bg-neutral rounded-box scrollbar">
            {/* item here */}
            {showReelCurrentCategory?.data?.map(item => (
              <div
                className="carousel-item relative overflow-hidden rounded-box "
                key={item._id}
                onClick={() => handleCurrentVideo(item)}
              >
                <img
                  src={`https://img.youtube.com/vi/${item.video_id}/mqdefault.jpg`}
                  alt={item.title}
                  // className=""
                  className={`w-[240px] relative showreel-item-img cursor-pointer ${
                    showReelCurrentPlay?.video_id === item.video_id
                      ? 'brightness-[20%]'
                      : 'hover:brightness-100'
                  }`}
                />
                <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
                  {isLoadingImage && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black flex justify-center items-center">
                      <LoadingVideo />
                    </div>
                  )}
                  {showReelCurrentPlay?.video_id === item.video_id ? (
                    <p>Now Playing...</p>
                  ) : (
                    <p className="text-my-orange h-full w-full flex justify-center items-center duration-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 bg-white rounded-full"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Showreel;

function LoadingVideo() {
  return (
    <div className="relative">
      <div className="ball-clip-rotate-inner mx-auto  p-12">
        <div className="dot-spin relative w-2 h-2 rounded-full bg-transparent mx-auto shadow-[0_-18px_0_0_#ffffff,12.72984px_-12.72984px_0_0_#ffffff,_18px_0_0_0_#ffffff,12.72984px_12.72984px_0_0_rgba(152,128,255,0),_0_18px_0_0_rgba(152,128,255,0),-12.72984px_12.72984px_0_0_rgba(152,128,255,0),-18px_0_0_0_rgba(152,128,255,0),-12.72984px_-12.72984px_0_0_rgba(152,128,255,0)] animate-spin-dot"></div>
      </div>
    </div>
  );
}
