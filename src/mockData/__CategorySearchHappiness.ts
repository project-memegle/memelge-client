import { SearchResultSectionDTO } from 'services/dto/ResultDto';
import resolveImagePath from 'utils/Event/resolveImagePath';

const DATE = new Date().toISOString();

const MOCK_CATEGORY_RESULT_HAPINESS: SearchResultSectionDTO = {
    success: true,
    status: 'success',
    code: 200,
    message: 'Mock data fetched successfully',
    results: [
        {
            id: 51,
            imageUrl: resolveImagePath('/temp/Happiness/happiness-01.jpg'),
            imageCategory: 'birthday',
            createdAt: DATE,
            modifiedAt: DATE,
            taglist: ['전광렬', '노래부르기', 'singingman','happyman'],

        },
        {
            id: 52,
            imageUrl: resolveImagePath('/temp/Happiness/happiness-02.png'),
            imageCategory: 'birthday',
            createdAt: DATE,
            modifiedAt: DATE,
            taglist: ['영자이모', '먹는게최고', 'happywoman'],

        },
        {
            id: 53,
            imageUrl: resolveImagePath('/temp/Happiness/happiness-03.jpg'),
            imageCategory: 'birthday',
            createdAt: DATE,
            modifiedAt: DATE,
            taglist: ['햄스터', 'hamster'],

        },
        {
            id: 54,
            imageUrl: resolveImagePath('/temp/Happiness/happiness-04.jpg'),
            imageCategory: 'birthday',
            createdAt: DATE,
            modifiedAt: DATE,
            taglist: ['헤헤', 'hehe', 'cartoon'],

        },
        {
            id: 55,
            imageUrl: resolveImagePath('/temp/Happiness/happiness-05.jpg'),
            imageCategory: 'birthday',
            createdAt: DATE,
            modifiedAt: DATE,
            taglist: ['정재영', '뛰어가기', 'happyman'],

        },
        {
            id: 56,
            imageUrl: resolveImagePath('/temp/Happiness/happiness-06.jpg'),
            imageCategory: 'birthday',
            createdAt: DATE,
            modifiedAt: DATE,
            taglist: ['재롱잔치', '강아지지', 'dog'],

        },
    ],
};

export default MOCK_CATEGORY_RESULT_HAPINESS;
