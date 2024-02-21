import styles from "./Me.module.scss";

import { useState } from "react";

import { useMe } from "@/store/Me";
import { GetImageUrl } from "@/utils/Image";
import ProfileModal from "../../../modals/profile/ProfileModal";

export default function Me() {
    const [showProfile, setShowProfile] = useState(false);

    const me = useMe((state) => state.me);

    const closeProfile = () => setShowProfile(false);
    const openProfile = () => setShowProfile(true);

    if (me) {
        const imageURL = GetImageUrl(me.imageID);

        return (
            <div className={styles.me}>
                <img className={styles.meAvatar} src={imageURL} onClick={openProfile} />
                <div className={styles.meInfo}>
                    <span className={styles.name}>{me.name}</span>
                    <span className={styles.name}>{me.surname}</span>
                </div>
                {showProfile && <ProfileModal doClose={closeProfile} />}
            </div>
        );
    } else {
        return (
            <div className={styles.me}>
                <img className={styles.meAvatar} src={"/img/user.png"} data-loading="true" />
            </div>
        );
    }
}
