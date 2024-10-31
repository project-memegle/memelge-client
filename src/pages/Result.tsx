import { useOutletContext, useParams } from 'react-router-dom';
import useFetchHandler from '../hooks/useFetchHandler';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { ReactNode, useEffect, useState } from 'react';
import ResultSection from '../components/UI/Result/ResultSection';
import {
    clearSearchHistory as clearLocalStorageSearchHistory,
    deleteSearchHistroy,
    getSearchHistory,
} from 'utils/localStorage';
import emptyIcon from '@memegle/assets/images/ic_result_empty.png';
const mockData = {
    success: true,
    status: 'OK',
    code: 200,
    message: 'Data retrieved successfully',
    results: [
        {
            id: 1,
            imageUrl: '../public/tempImages/test1.jpeg',
            imageCategory: 'mudo',
            createdAt: '2024-08-15T10:25:30.673Z',
            modifiedAt: '2024-08-15T10:25:30.673Z',
        },
        {
            id: 2,
            imageUrl: '../public/tempImages/test2.jpeg',
            imageCategory: 'digiMon',
            createdAt: '2024-08-30T14:18:50.673Z',
            modifiedAt: '2024-08-30T14:18:50.673Z',
        },
        {
            id: 3,
            imageUrl: '../public/tempImages/test3.jpeg',
            imageCategory: 'favorite',
            createdAt: '2024-09-02T08:12:25.673Z',
            modifiedAt: '2024-09-02T08:12:25.673Z',
        },
        {
            id: 4,
            imageUrl: '../public/tempImages/test4.jpeg',
            imageCategory: 'gif',
            createdAt: '2024-09-01T11:05:40.673Z',
            modifiedAt: '2024-09-01T11:05:40.673Z',
        },
        {
            id: 5,
            imageUrl: '../public/tempImages/test5.jpeg',
            imageCategory: 'temp1',
            createdAt: '2024-07-25T12:33:45.673Z',
            modifiedAt: '2024-07-25T12:33:45.673Z',
        },
        {
            id: 6,
            imageUrl: '../public/tempImages/test6.jpeg',
            imageCategory: 'temp2',
            createdAt: '2024-07-18T15:20:25.673Z',
            modifiedAt: '2024-07-18T15:20:25.673Z',
        },
        {
            id: 7,
            imageUrl: '../public/tempImages/test7.jpeg',
            imageCategory: 'mudo',
            createdAt: '2024-08-10T09:45:55.673Z',
            modifiedAt: '2024-08-10T09:45:55.673Z',
        },
        {
            id: 8,
            imageUrl: '../public/tempImages/test8.jpeg',
            imageCategory: 'digiMon',
            createdAt: '2024-07-28T17:10:35.673Z',
            modifiedAt: '2024-07-28T17:10:35.673Z',
        },
        {
            id: 9,
            imageUrl: '../public/tempImages/test9.jpeg',
            imageCategory: 'favorite',
            createdAt: '2024-06-15T07:22:10.673Z',
            modifiedAt: '2024-06-15T07:22:10.673Z',
        },
        {
            id: 10,
            imageUrl: '../public/tempImages/test10.jpeg',
            imageCategory: 'gif',
            createdAt: '2024-07-19T13:33:30.673Z',
            modifiedAt: '2024-07-19T13:33:30.673Z',
        },
        {
            id: 11,
            imageUrl: '../public/tempImages/test11.jpeg',
            imageCategory: 'temp1',
            createdAt: '2024-09-10T11:15:20.673Z',
            modifiedAt: '2024-09-10T11:15:20.673Z',
        },
        {
            id: 12,
            imageUrl: '../public/tempImages/test1.jpeg',
            imageCategory: 'temp2',
            createdAt: '2024-09-11T14:10:55.673Z',
            modifiedAt: '2024-09-11T14:10:55.673Z',
        },
        {
            id: 13,
            imageUrl: '../public/tempImages/test2.jpeg',
            imageCategory: 'mudo',
            createdAt: '2024-08-09T08:42:35.673Z',
            modifiedAt: '2024-08-09T08:42:35.673Z',
        },
        {
            id: 14,
            imageUrl: '../public/tempImages/test3.jpeg',
            imageCategory: 'digiMon',
            createdAt: '2024-07-15T16:22:10.673Z',
            modifiedAt: '2024-07-15T16:22:10.673Z',
        },
        {
            id: 15,
            imageUrl: '../public/tempImages/test4.jpeg',
            imageCategory: 'favorite',
            createdAt: '2024-07-25T09:50:40.673Z',
            modifiedAt: '2024-07-25T09:50:40.673Z',
        },
        {
            id: 16,
            imageUrl: '../public/tempImages/test5.jpeg',
            imageCategory: 'gif',
            createdAt: '2024-06-25T13:30:20.673Z',
            modifiedAt: '2024-06-25T13:30:20.673Z',
        },
        {
            id: 17,
            imageUrl: '../public/tempImages/test6.jpeg',
            imageCategory: 'temp1',
            createdAt: '2024-09-02T12:45:35.673Z',
            modifiedAt: '2024-09-02T12:45:35.673Z',
        },
        {
            id: 18,
            imageUrl: '../public/tempImages/test7.jpeg',
            imageCategory: 'temp2',
            createdAt: '2024-07-05T10:20:25.673Z',
            modifiedAt: '2024-07-05T10:20:25.673Z',
        },
        {
            id: 19,
            imageUrl: '../public/tempImages/test8.jpeg',
            imageCategory: 'mudo',
            createdAt: '2024-06-30T08:35:40.673Z',
            modifiedAt: '2024-06-30T08:35:40.673Z',
        },
        {
            id: 20,
            imageUrl: '../public/tempImages/test9.jpeg',
            imageCategory: 'digiMon',
            createdAt: '2024-08-11T12:12:15.673Z',
            modifiedAt: '2024-08-11T12:12:15.673Z',
        },
    ],
};

interface MockDataItem {
    id: number;
    imageUrl: string;
    imageCategory: string;
    createdAt: string;
    modifiedAt: string;
}

interface MockData {
    success: boolean;
    status: string;
    code: number;
    message: string;
    results: MockDataItem[];
}

type OutletContextType = { searchTerm: string; searchHistory: string[] };

export default function Result() {
    const params = useParams<{ category: string }>();
    const category = params.category;
    const { searchTerm, searchHistory: initialSearchHistory } =
        useOutletContext<OutletContextType>();
    const { data, loading, error } = useFetchHandler<MockData | null>(mockData);
    const [searchHistory, setSearchHistory] =
        useState<string[]>(initialSearchHistory);
    const [content, setContent] = useState<ReactNode>(null);

    useEffect(() => {
        setSearchHistory(getSearchHistory());
    }, [searchTerm]);

    function handleTagRemove(index: number) {
        const newSearchHistory = searchHistory.filter((_, i) => i !== index);
        deleteSearchHistroy(index);
        setSearchHistory(newSearchHistory);
    }
    function clearSearchHistory() {
        clearLocalStorageSearchHistory();
        setSearchHistory([]);
    }

    useEffect(() => {
        if (loading) {
            setContent(<LoadingSpinner />);
        } else if (error) {
            setContent(<div>Error: {error}</div>);
        } else if (data && data.results.length > 0) {
            const categoryData = data.results.filter(
                (item) => item.imageCategory === category
            );

            setContent(
                categoryData.length > 0 ? (
                    <ResultSection {...categoryData} />
                ) : (
                    <div className="c-result__emtpy">
                        <img src={emptyIcon} alt="empty" />
                    </div>
                )
            );
        }
    }, [loading, error, data, category]);

    return (
        <main className="home__main c-result">
            <section className="c-result__searchHistory">
                <ul className="tag-list">
                    {searchHistory.map((tag, index) => (
                        <li className="tag-list__item" key={index}>
                            {tag}
                            <span
                                className="cross"
                                onClick={() => handleTagRemove(index)}
                            ></span>
                        </li>
                    ))}
                    {searchHistory.length > 0 && (
                        <li className="tag-list__clear">
                            <button onClick={clearSearchHistory}>
                                전체삭제
                            </button>
                        </li>
                    )}
                </ul>
            </section>
            {content}
        </main>
    );
}
