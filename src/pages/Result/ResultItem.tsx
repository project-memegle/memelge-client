import { useState } from 'react';
import { copyImgToClipboard } from 'utils/Event/copyImageToClipboard';
import ToastMessage from '../../components/UI/ToastMessage/ToastMessage';
import ValidationMessages from 'components/Validations/ValidationMessages';
import { SearchResultItemDTO } from 'services/dto/ResultDto';
import handleCopyImage from 'utils/Event/handleCopyImage';

export default function ResultItem(result: SearchResultItemDTO) {
    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    async function handleCopy() {
        await handleCopyImage(result.imageUrl, setToastMessage, setToast);
    }
    
    return (
        <article className="result__item" onClick={handleCopy}>
            <div className="result__item-copy">
                <i className="c-icon">file_copy</i>
            </div>{' '}
            <div className="result__item-favorite">
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
