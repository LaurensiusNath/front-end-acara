import React from "react";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";
import HomeEventList from "./HomeEventList";
import { Skeleton } from "@nextui-org/react";
import Image from "next/image";
import HomeCategoryList from "./HomeCategoryList";

const Home = () => {
  const {
    dataBanners,
    isLoadingBanners,
    dataFeaturedEvents,
    isLoadingFeaturedEvents,
    dataLatestEvents,
    isLoadingLatestEvents,
    dataCategories,
    isLoadingCategories,
  } = useHome();
  return (
    <div>
      <HomeSlider
        banners={dataBanners?.data}
        isLoadingBanners={isLoadingBanners}
      />

      <HomeEventList
        title="Featured Event"
        events={dataFeaturedEvents?.data}
        isLoading={isLoadingFeaturedEvents}
        urlMore="/event?isFeatured=true"
      />
      <Skeleton
        isLoaded={!isLoadingBanners && dataBanners?.data.length > 0}
        className="mb-16 h-[20vw] w-full rounded-2xl px-6 lg:px-0"
      >
        {dataBanners?.data.length > 0 && (
          <Image
            src={`${dataBanners?.data[0]?.image}`}
            alt="banner"
            className="h-[20vw] w-full rounded-2xl object-cover object-center"
            width={1920}
            height={800}
          />
        )}
      </Skeleton>
      <HomeEventList
        title="Latest Event"
        events={dataLatestEvents?.data}
        isLoading={isLoadingLatestEvents}
      />
      <HomeCategoryList
        dataCategories={dataCategories?.data}
        isLoadingCategories={isLoadingCategories}
      />
    </div>
  );
};

export default Home;
