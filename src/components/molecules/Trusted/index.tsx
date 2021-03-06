import { useAppDispatch, useAppSelector } from '@/config/Redux/hooks';
import {
  selectClientLogo,
  setClientLogoList,
} from '@/config/Redux/slices/clientLogoSlice';
import { useClientsLogo } from '@/hooks/api/app';
import React, { useEffect } from 'react';

export default function Trusted() {
  const { clients } = useAppSelector(selectClientLogo);
  const { data, isLoading } = useClientsLogo();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setClientLogoList(data));
  }, [dispatch, data]);

  return (
    <section className="relative bg-main-color batas-suci">
      <div className="mx-auto py-12 md:py-20">
        <div className="flex justify-center md:flex-row flex-col-reverse">
          <div className="relative flex-item md:w-1/2 md:max-w-md w-full h-[300px] md:h-[500px] overflow-hidden mt-16">
            <div className="carousel-cont grid lg:grid-cols-2 grid-cols-3 left-0 m-animate-loop-scroll md:animate-loop-scroll  justify-center">
              {!isLoading &&
                clients?.map((item, index) => (
                  <div className="item-logo md:p-5 p-2" key={index}>
                    <div className="item w-24 lg:w-44 h-12 lg:h-24 flex justify-center items-center bg-text-color rounded-lg lg:rounded-2xl duration-500 mx-auto">
                      <img
                        src={item?.logo.url}
                        alt={item?.name}
                        title={item?.name}
                        className="max-w-full max-h-full duration-500 px-2"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex-item md:w-1/2 max-w-xl md:pl-10 mx-auto">
            <div className="relative p-6">
              <div className="title mb-6">
                <h1 className="text-2xl md:text-4xl font-bold capitalize text-my-orange">
                  who are we?
                </h1>
              </div>
              <div className="text-cont">
                <div className="desc text-sm sm:text-base text-text-color mb-12">
                  <p className="mb-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Explicabo eveniet cumque ducimus saepe est minus inventore
                    delectus laudantium rerum hic magni veritatis,
                    exercitationem a sequi fugiat vel corrupti provident.
                    Mollitia!
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Explicabo eveniet cumque ducimus saepe est minus inventore
                    delectus laudantium rerum hic magni veritatis,
                    exercitationem a sequi fugiat vel corrupti provident.
                    Mollitia!
                  </p>
                </div>
                <div className="detail flex justify-between items-center">
                  <div className="item">
                    <p className="font-bold text-my-orange text-xl md:text-3xl">
                      100++
                    </p>
                    <p>Happy Clients</p>
                  </div>
                  <div className="item">
                    <p className="font-bold text-my-orange text-xl md:text-3xl">
                      1000++
                    </p>
                    <p>Projects Created</p>
                  </div>
                  <div className="item">
                    <p className="font-bold text-my-orange text-xl md:text-3xl">
                      24/7
                    </p>
                    <p>Online Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
