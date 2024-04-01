"use server";
import {Review, UpdateUserDto, User} from "@/app/lib/definitions";
import {cookies} from "next/headers";
import {formatDateForSave} from "@/app/lib/utils";

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

/**
 * Used in client components
 * @param companyName
 * @param companyAddress
 * @param limit
 */
export async function getCompanyReviews(companyName, companyAddress, limit) {
    const scrapper_url = process.env.OUT_SCRAPPER_URL;
    const scrapper_token = process.env.OUT_SCRAPPER_TOKEN;
    const query = encodeURIComponent(`${companyName},${companyAddress}`);
    try {
        const response = await fetch(scrapper_url + `/maps/reviews-v3?query=${query}&reviewsLimit=${limit}&async=false`, {
            headers: {
                "Content-Type": "application/json",
                'X-API-KEY': scrapper_token
            },
            cache: "no-store",
        });
        
        const data = await response.json();
        if (data?.status === 'Success') {
            if (data?.data?.length && data?.data[0]['place_id'] !== "__NO_PLACE_FOUND__") {
                const clearData = data?.data[0];
                const companyId = clearData['place_id'];
                const companyFullAddress = clearData['full_address'];
                const companyFullName = clearData['name'];
                const reviewsList = clearData['reviews_data'].map(review => ({
                    author: review['author_title'],
                    date: formatDateForSave(review['review_datetime_utc']),
                    rating: review['review_rating'],
                    image: review['author_image'],
                    description: review['review_text'],
                    reviewId: review['review_id'],
                    companyId
                }));
                
                return {
                    companyAddress: companyFullAddress,
                    companyName: companyFullName,
                    companyId,
                    reviews: reviewsList
                }
            } else {
                throw new Error('There are no any place matching your request...');
            }
        }
    
        throw new Error('Error occurred while fetching reviews...');
    } catch (e) {
        return {ok: false, error: e.message, data: null};
    }
}


export async function updateUser(user :UpdateUserDto) {
    try {
        const STRAPI_URL = process.env.STRAPI_URL;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const url = `${STRAPI_URL}/api/users/${user.id}`;
        
        const authToken = cookies().get("authRe")?.value;
        if (!authToken) throw new Error("Not Authorized.");
        delete user.id;
        
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
        });
        const data = await response.json();
        
        if (!response.ok || data.error) {
            throw new Error(data.error.message);
        }
    } catch (err) {
        return {error: err?.message};
    }
    revalidatePath("/dashboard");
    redirect("/dashboard");
}

export async function insertReviews(reviews :Review[]) {
    const STRAPI_URL = process.env.STRAPI_URL;
    if (!STRAPI_URL) throw new Error("Missing STRAPI_URL environment variable.");
    const url = `${STRAPI_URL}/api/reviews`;
    const authToken = cookies().get("authRe")?.value;
    if (!authToken) throw new Error("Not Authorized.");

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(reviews),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
        });
        const data = await response.json();
        if(data.count) {
            return data.count;
        }
    
        if (!response.ok || data.error || data.name === 'error') {
            throw new Error('Reviews were not inserted');
        }
    } catch (err) {
        return {error: err?.message}
    }
}