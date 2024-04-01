'use client'
import React, {useEffect, useRef, useState} from "react";
import UserItem from "@/app/ui/dashboard/users/userItem";
import {useInView} from "react-intersection-observer";
import clsx from "clsx";

export default function UsersList({opened = false}) {
    const endFetching = useRef(false);
    const [users, setUsers] = useState([]);
    const limit = 10;
    const offset = useRef(0);
    const container = useRef<HTMLDivElement | any>();
    const scroll = useRef(false);
    
    async function fetchUsersHandler() {
        if (endFetching.current) {
            return
        }
        
        try {
            scroll.current = true;
            const response = await fetch(`/users?limit=${limit}&start=${offset.current}`);
            if(response.status >= 400) {
                endFetching.current = true;
            }

            const data = await response.json();
            
            if (data?.data?.error) {
                throw new Error(data?.data?.error?.message)
            }
            
            offset.current += limit;
            
            if (data.data?.length) {
                setUsers((prevState) => [...prevState, ...data.data]);
            } else {
                ref.current = null;
                endFetching.current = true;
            }
            
        } catch (e) {
            endFetching.current = true;
        } finally {
            scroll.current = false;
        }
    }
    
    useEffect(() => {
            (async () => {
                await fetchUsersHandler();
            })();
    }, []);
    
    const handleScroll = async (event: React.UIEvent<HTMLDivElement>) => {
        if (scroll.current) {
            return;
        }
        const containerHeight = event.currentTarget.clientHeight;
        const scrollHeight = event.currentTarget.scrollHeight;
        
        const scrollTop = event.currentTarget.scrollTop;
        if(((scrollTop + containerHeight) / scrollHeight) > 0.7) {
            await fetchUsersHandler();
        }
    };
    
    return (
        <div className="max-w-[1372px] w-full m-auto mt-0" ref={container}>
            <div className={clsx(
                "md:col-span-4 overflow-y-auto h-screen pretty-scroll",
                {
                    "m-auto max-w-[1372px] pr-5 pr-[32px]": !opened,
                    "max-w-[664px] sm:pr-4": opened,
                }
            )}

                 onScroll={handleScroll}>
                {users.map((user, index) => {
                    return (<UserItem key={user.email}   {...user} />)
                })}
                {!endFetching && (<div ref={ref} className="h-16"></div>)}
            </div>
        </div>
    );
}