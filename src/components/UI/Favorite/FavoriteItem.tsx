interface FavoriteItem {
    id: string;
    url: string;
}

export default function FavoriteItemComponent() {
    const favoriteArray: FavoriteItem[] = [
        { id: '1', url: '../public/tempImages/test2.jpeg' },
        { id: '2', url: '../public/tempImages/test1.jpeg' },
        { id: '3', url: '../public/tempImages/test3.jpeg' },
        { id: '4', url: '../public/tempImages/test4.jpeg' },
        { id: '5', url: '../public/tempImages/test5.jpeg' },
    ];

    return (
        <>
            {favoriteArray.map((item) => {
                return (
                    <article className="category__item" key={item.id}>
                        <img src={item.url} alt={`img-${item.id}`} />
                    </article>
                );
            })}
        </>
    );
}