
import React, { useState, useEffect } from 'react';
import Card from './Card';
import './CardBox.css';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';

export default function CardBox(props) {
    const [dark, setDark] = useState({
        color: props.modelevel === 'Light' ? 'white' : 'black',
        backgroundColor: props.modelevel === 'Light' ? '#091030' : 'white'
    });

    useEffect(() => {
        setDark({
            color: props.modelevel === 'Light' ? 'white' : 'black',
            backgroundColor: props.modelevel === 'Light' ? '#091030' : 'white'
        });
    }, [props.modelevel]);

    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const newItems = props.dataget.slice(startIndex, endIndex);
        setItems(prevItems => [...prevItems, ...newItems]);
    }, [currentPage, props.dataget]);

    const fetchMoreData = () => {
        setTimeout(() => {
            setCurrentPage(currentPage + 1);
        }, 1500);

    };

    return (
        <>
            <div className="outer" style={dark}>
                <h1>Dog Breeds</h1>
                <div className="inner">
                    <InfiniteScroll
                        dataLength={items.length}
                        next={fetchMoreData}
                        hasMore={items.length < props.dataget.length}
                        loader={<div className='spinner-cont'><Spinner modelevel={props.modelevel} /></div>}
                        style={{ overflowX: 'hidden' }}

                    >
                        <div className="row">
                            {items.map((element, index) => (
                                <div className="col-md-4 col-sm-6" key={index}>
                                    <Card
                                        modelevel={props.modelevel}
                                        eleimg={element.img === "Not available" ? "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png" : element.img}
                                        elebreed={element.breed}
                                        eleori={element.origin}
                                    />
                                </div>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </>
    );
}
