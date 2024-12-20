import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import resolveImagePath from 'utils/Event/resolveImagePath';

const DATE = new Date().toISOString();

const MOCK_CATEGORY_RESULT_SAD: SearchResultSectionDTO = {
    success: true,
    status: 'success',
    code: 200,
    message: 'Mock data fetched successfully',
    results: [
        {
            id: 71,
            imageUrl: resolveImagePath('/temp/Sad/sad-01.webp'),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['피글렛', '소리지르기', 'piglet', 'screaming'],
        },
        {
            id: 72,
            imageUrl: resolveImagePath('/temp/Sad/sad-02.webp'),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['애기', 'sad'],
        },
        {
            id: 73,
            imageUrl: resolveImagePath('/temp/Sad/sad-03.webp'),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['또르륵', 'cartoon', 'tearingup'],
        },
        {
            id: 74,
            imageUrl: resolveImagePath('/temp/Sad/sad-04.webp'),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['강아지', '서운함', 'doggo', 'saddog'],
        },
        {
            id: 75,
            imageUrl: resolveImagePath('/temp/Sad/sad-05.webp'),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['고양이', '아기고양이', 'sadcat', 'kitten'],
        },
        {
            id: 76,
            imageUrl: resolveImagePath('/temp/Sad/sad-06.webp'),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['고양이', '아기고양이', 'sadcat', 'kitten'],
        },
        {
            id: 77,
            imageUrl: resolveImagePath('/temp/Sad/sad-07.webp'),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['핑구', '서운함', 'pingu', 'tearingup'],
        },
        {
            id: 78,
            imageUrl: resolveImagePath('/temp/Sad/sad-08.webp'),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['햄스터', '서운함', 'hamster'],
        },
        {
            id: 79,
            imageUrl: resolveImagePath('/temp/Sad/sad-09.webp'),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['리사', '심슨', 'lisa', 'simpson'],
        },
        {
            id: 710,
            imageUrl: resolveImagePath('/temp/Sad/sad-10.webp'),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['바비', 'bobby'],
        },
        {
            id: 711,
            imageUrl: resolveImagePath('/temp/Sad/sad-11.webp'),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['눕는다', '또르륵', 'cartoon'],
        },
        {
            id: 712,
            imageUrl: resolveImagePath('/temp/Sad/sad-12.webp'),
            imageCategory: 'Sad',
            createdAt: DATE,
            modifiedAt: DATE,
            tagList: ['조인성', '입틀막', 'sadman'],
        },
    ],
};

export default MOCK_CATEGORY_RESULT_SAD;
