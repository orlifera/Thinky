import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { AvatarProps } from "@/types";
import { randomUsername } from "@/data";
import { randomAvatars } from "@/data";
import { useEffect, useState } from "react";

export default function AvatarDemo({ username }: AvatarProps) {
    const fallbackAvatarUrl = "./info.png";
    const fallbackLetters = username?.slice(0, 2).toUpperCase() || "UP";
    const [avatarUrl, setAvatarUrl] = useState<string>(fallbackAvatarUrl);

    useEffect(() => {
        if (!username || randomUsername.includes(username)) {
            // Use official avatar
            const officialUrl = username
                ? `https://raw.githubusercontent.com/orlifera/data/master/avatars/${username.replace(" ", "").toLowerCase()}.png`
                : fallbackAvatarUrl;
            setAvatarUrl(officialUrl);
        } else {
            // Check sessionStorage for cached random avatar
            const key = `avatar-for-${username}`;
            const stored = sessionStorage.getItem(key);

            if (stored) {
                setAvatarUrl(`https://raw.githubusercontent.com/orlifera/data/master/avatars/${stored}`);
            } else {
                const randomAvatar = randomAvatars[Math.floor(Math.random() * randomAvatars.length)];
                sessionStorage.setItem(key, randomAvatar);
                setAvatarUrl(`https://raw.githubusercontent.com/orlifera/data/master/avatars/${randomAvatar}`);
            }
        }
    }, [username]);

    return (
        <Avatar>
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{fallbackLetters}</AvatarFallback>
        </Avatar>
    );
}
