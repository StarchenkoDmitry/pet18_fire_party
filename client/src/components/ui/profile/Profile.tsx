import styles from "./Profile.module.scss";

import { useEffect, useState } from "react";

import Avatar from "./Avatar";
import AvatarEditorModal from "../../modals/profile/AvatarEditorModal";

import { ConvertBlobToStringBase64, ConvertDataURLToBlob } from "@/utils/Convert";
import { GetMyAvatar, SetMyAvatar } from "@/actions/Image.actions";

import { useMe } from "@/store/Me";

export default function Profile() {
    // console.log("Rendering Profile")

    const me = useMe((state) => state.me);
    const changeName = useMe((state) => state.changeName);
    const changeSurname = useMe((state) => state.changeSurname);

    const [meLoaded, setMeLoaded] = useState(false);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const [showAvatarEditor, setShowAvatarEditor] = useState(false);

    const openAvatarEditor = () => setShowAvatarEditor(true);
    const closeAvatarEditor = () => setShowAvatarEditor(false);

    const getMyImage = async (): Promise<string | undefined> => {
        const blob = await GetMyAvatar();
        if (!blob) return;
        const imageDataURL = await ConvertBlobToStringBase64(blob);
        return imageDataURL;
    };
    const setMyImage = async (dataURL: string): Promise<boolean> => {
        const blob = await ConvertDataURLToBlob(dataURL);

        const resUpdateAvatar = await SetMyAvatar(blob);
        console.log("resUpdateAvatar: ", resUpdateAvatar);

        return false;
    };

    useEffect(() => {
        if (!me || meLoaded) return;
        setName(me.name || "");
        setSurname(me.surname || "");
        setMeLoaded(true);
    }, [me]);

    const eventChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        changeName(event.target.value);
    };

    const eventChangeSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSurname(event.target.value);
        changeSurname(event.target.value);
    };

    if (me) {
        return (
            <div className={styles.profileEditor}>
                <h2>My profile</h2>
                <span>ID: {me.id}</span>
                <div className={styles.info}>
                    <Avatar imageID={me.imageID} onClick={openAvatarEditor} />
                    <div className={styles.names}>
                        <label className={styles.label}>Name</label>
                        <input
                            className={styles.input}
                            placeholder={"input for name"}
                            onChange={eventChangeName}
                            value={name}
                        />

                        <label className={styles.label}>Surname</label>
                        <input
                            className={styles.input}
                            placeholder={"input for surname"}
                            onChange={eventChangeSurname}
                            value={surname}
                        />
                    </div>
                </div>
                <div>
                    <button className={styles.buttonDelete}>Delete me</button>
                </div>
                {showAvatarEditor && (
                    <AvatarEditorModal
                        loadImage={getMyImage}
                        saveImage={setMyImage}
                        doClose={closeAvatarEditor}
                    />
                )}
            </div>
        );
    } else {
        //PROFILE_SKELETE
        return (
            <div className={styles.profileEditor}>
                <h2>My profile</h2>
                <span>ID: 1234####-####-####-1234-####1234####</span>
                <div className={styles.maininfo}>
                    <img className={styles.skelete_img} src="/img/user.png" />
                    <div className={styles.names}>
                        <span className={styles.name}>name: Duck</span>
                        <span className={styles.name}>surname: Omutovich</span>
                    </div>
                </div>
                <div>
                    <button className={styles.btn_deleteMe}>Delete me</button>
                </div>
            </div>
        );
    }
}
