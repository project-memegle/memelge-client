import { useState } from 'react';
import ToastMessage from '../../components/UI/ToastMessage/ToastMessage';
import { SearchResultItemDTO } from 'services/dto/ResultDto';
import handleCopyImage from 'utils/Event/handleCopyImage';
import {
    getArraySessionStorages,
    setArraySessionStorages,
} from 'utils/Storage/sessionStorage';
import { SESSION_STORAGE_KEY } from 'pages/Favorite/Favorite';
import ValidationMessages from 'components/Validations/ValidationMessages';

type FavoriteItemProps = {
    id: number;
    imageUrl: string;
};

export default function ResultItem(result: SearchResultItemDTO) {
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    async function handleCopy() {
        await handleCopyImage(result.imageUrl, setToastMessage, setToast);
    }

    //todo : API 로 바꾸기
    function addToFavoriteApi({ id, imageUrl }: FavoriteItemProps) {
        const favoriteList = getArraySessionStorages(SESSION_STORAGE_KEY) || [];
        console.log('favoriteList', favoriteList);
        const favoriteItem = { id, imageUrl };
    }

    async function addToFavorite({ id, imageUrl }: FavoriteItemProps) {
        try {
            addToFavoriteApi({ id, imageUrl });
            setToastMessage(ValidationMessages.SUCCESS_ADD_FAVORITE);
            setToast(true);
        } catch (error) {
            console.error(error);
            setToastMessage(ValidationMessages.FAILED_EVENT);
            setToast(true);
        }
    }

    return (
        <article className="result__item" onClick={handleCopy}>
            <div className="result__item-copy">
                <i className="c-icon">file_copy</i>
            </div>{' '}
            <div
                className="result__item-favorite"
                onClick={(e) => {
                    e.stopPropagation();
                    addToFavorite({ id: result.id, imageUrl: result.imageUrl });
                }}
            >
                <i className="c-icon">heart_plus</i>
                {/* <i className="c-icon">heart_check</i> */}
            </div>
            <img src={result.imageUrl} alt={`img-${result.id}`} />
            {toast && (
                <ToastMessage
                    message={toastMessage}
                    onClose={() => setToast(false)}
                />
            )}
        </article>
    );
}
