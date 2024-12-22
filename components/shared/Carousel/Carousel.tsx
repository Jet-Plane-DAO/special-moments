import { ReactNode, useMemo, useState } from "react";
import { Swiper, SwiperProps, SwiperSlide, useSwiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { Chevron } from "../../icons";

export interface CarouselProps extends SwiperProps {
    renderItem: (item: any, index: number) => ReactNode
    slides: any[];
    mainClassname?: string
    navAddOnClassName?: string
}

export const CarouselItem = SwiperSlide

export default function Carousel({ renderItem, slides, mainClassname, navAddOnClassName, ...props }: CarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const slidesPerView: number = useMemo(() => {
        const {breakpoints = null} = props
        if(breakpoints) {
            return (breakpoints[768].slidesPerView as number) ?? 4
        }
        return 4
    }, [props])
    return (
        <div className={['ml-0', mainClassname ?? ''].join(' ')}>
            <Swiper
                spaceBetween={10}
                slidesPerView={1.1}
                loop
                breakpoints={{
                    [768]: {
                        slidesPerView: 4
                    }
                }}
                {...props}
                onActiveIndexChange={(swiper) => {
                    setActiveIndex(swiper.realIndex)
                }}
            >
                {slides?.map((slide, i) => {
                    return ( 
                        <SwiperSlide key={new Date().getMilliseconds + '' + i}>{renderItem(slide, i)}</SwiperSlide> 
                    )
                })}
                {slides.length > slidesPerView  && <Navigation className={navAddOnClassName} count={slides.length ?? 0} currentIdx={activeIndex} />}
            </Swiper>

        </div>
    )
}

function Navigation({ count, currentIdx = 0, className = "" }: { count: number; currentIdx?: number, className?: string }) {
    const swiper = useSwiper()
    return (
        <div className={["flex justify-between space-x-1", className ].join(" ")} slot="container-start">
            <button onClick={() => swiper.slidePrev()} className="btn btn-primary min-h-0 h-[36px] w-10">
                <Chevron className="rotate-180" />
            </button>
            <div className="rounded-min flex bg-gray-10 space-x-2 justify-center items-center flex-auto">
                {Array(count)
                    .fill(0)
                    .map((s, i) => {
                        return (
                            <button
                                className={`btn bg-${i === currentIdx ? 'primary' : 'secondary'} border-0 rounded-full h-[8px] w-[8px] p-0 min-h-0`}
                                key={i}
                                onClick={() => swiper.slideTo(i)}
                            />
                        )
                    })}
            </div>
            <button onClick={() => swiper.slideNext()} className="btn btn-primary min-h-0 h-[36px] w-10">
                <Chevron />
            </button>
        </div>
    )
}

