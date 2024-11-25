import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import StoreCard from './StoreCard';

interface Store {
  id: number;
  name: string;
  logoUrl: string;
  isOpen: boolean;
}

interface StoresCarouselProps {
  stores: Store[];
  title: string;
}

export default function StoresCarousel({ stores, title }: StoresCarouselProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="store-carousel"
      >
        {stores.map((store) => (
          <SwiperSlide key={store.id}>
            <StoreCard {...store} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}