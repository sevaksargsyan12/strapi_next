'use client'
import React, {useEffect, useRef, useState} from "react";
import {Company, Review} from "@/app/lib/definitions";
import ReviewItem from "@/app/ui/dashboard/reviews/reviewItem";
import {useInView} from "react-intersection-observer";
import CompanyInfo from "@/app/ui/dashboard/reviews/companyInfo";

export default function ReviewsList({companyId = '', companyAddress = '', companyName = '', key}: Partial<Company>) {
    const [isLoading, setLoading] = useState(true);
    const [reviews, setReviews] = useState<Review[]>([]);
    const limit = 5;
    const offset = useRef(0);
    const total = useRef(0);
    const scroll = useRef(false);
    const endFetching = useRef(false);
    
    async function fetchReviewsHandler() {
        if(endFetching.current) {
            return;
        }
        try {
            scroll.current = true;
            setLoading(false);
    
            if (total.current && (offset.current + limit >= total.current)) {
                endFetching.current = true;
            }
            const response = await fetch(`/reviews?limit=${limit}&start=${offset.current}&companyId=${companyId}`);

            if (response.status >= 400) {
                throw new Error('Something went wrong...');
            }
            
            const { meta, ...restData } = await response.json();
            const data = Object.values(restData);
            
            total.current = meta.pagination.total;
            offset.current += limit;
            
            if (data?.length) {
                // offset === 0  ? setReviews([...data.data]) :
                setReviews((prevState) => [...prevState, ...data]);
            }
        } catch (e) {
            setError('Something went wrong')
        } finally {
            scroll.current = false;
        }
    }
    
    useEffect(() => {
        if (companyId) {
            setReviews([]);
            fetchReviewsHandler();
        }
    }, [companyId]);
    
    const handleScroll = async (event: React.UIEvent<HTMLDivElement>) => {
        if (scroll.current) {
            return;
        }
        const containerHeight = event.currentTarget.clientHeight;
        const scrollHeight = event.currentTarget.scrollHeight;
        
        const scrollTop = event.currentTarget.scrollTop;
        if(((scrollTop + containerHeight) / scrollHeight) > 0.7) {
            await fetchReviewsHandler();
        }
    };
    
    return (
        <div className="reviews-list-wrapper max-w-[1372px] w-full m-x-auto bg-white mt-0 ml-4">
            {companyId && <CompanyInfo companyAddress={companyAddress || ''} companyName={companyName || ''}/>}
            {
                isLoading ? <p className="text-center">Loading...{isLoading.toString()}</p> :
                    (<div className="pretty-scroll w-full md:col-span-4 overflow-y-auto h-screen" onScroll={handleScroll}>
                        {!!reviews?.length ? reviews?.map((review, index) => <ReviewItem
                                key={review?.reviewId} {...review}/>) :
                            <p className="text-center mt-2">You have not any review yet...</p>}
                    </div>)
            }
            {/*{!endFetching && (<div ref={ref} className="h-32 text-center mt-0"></div>)}*/}
        </div>
    );
};
