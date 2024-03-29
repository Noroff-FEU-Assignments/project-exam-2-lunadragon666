import axios from 'axios';
import { BASE_URL, SLIDER } from '../../../constants/data';
import { Carousel } from 'react-bootstrap';
import ErrorMessage from "../../common/ErrorMessage";
import Loader from "../../../components/layout/Loader";
import React from 'react';
import { useState, useEffect } from 'react';

const header = BASE_URL + SLIDER;

function Slider() {
    const [slide, setSlider] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getHeader() {
            try {
                const response = await axios.get(header);
                if (response.status === 200) {
                    setSlider(response.data);
                } else {
                    setError("An error occurred!");
                }
            } catch (error) {
                setError(error.toString());
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getHeader();
    }, []);
    if (loading) {
        return <Loader />;
    }
    if (error) {
        console.log(error);
        return <ErrorMessage message={`Error: ${error}.`} />
    }

    return (
        <Carousel interval={null}>
            {slide.filter(paint => paint.year > 2021).slice(0, 2).map(function (slider) {
            return <Carousel.Item key={slider.id} id={slider.id}>
                        <img className="sliderimg d-block w-100"
                             src={slider.image[0].url}
                             alt={slider.title}
                             onContextMenu={(e) => {
                                e.preventDefault(); 
                             }} 
                             style={{
                                filter: 'brightness(75%)',
                                height: 600,
                                objectFit: 'cover',
                            }}
                        />
                        <Carousel.Caption>
                            <h2 style={{ fontSize: '21px', }}>{slider.title}</h2>
                            <p className="caption" 
                               style={{ 
                                fontSize: '16px', 
                                textTransform: 'capitalize', 
                            }}>
                                {slider.year} | {slider.category}
                            </p>
                        </Carousel.Caption>
                </Carousel.Item>
            })}
        </Carousel>
    )
}

export default Slider;
