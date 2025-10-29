import movingImg1 from '../assets/home/moving-img-1.jpg';
import movingImg2 from '../assets/home/moving-img-2.jpg';
import movingImg3 from '../assets/home/moving-img-3.jpg';
import movingImg4 from '../assets/home/moving-img-4.jpg';
import movingImg5 from '../assets/home/moving-img-5.jpg';
import movingImg6 from '../assets/home/moving-img-6.jpg';
import movingImg7 from '../assets/home/moving-img-7.jpg';
import movingImg8 from '../assets/home/moving-img-8.jpg';
import movingImg9 from '../assets/home/moving-img-9.jpg';
import movingImg10 from '../assets/home/moving-img-10.jpg';
import movingImg11 from '../assets/home/moving-img-11.png';
import movingImg12 from '../assets/home/moving-img-12.jpg';
import movingImg13 from '../assets/home/moving-img-13.jpg';

export function homeMovingImage(movingImgNum: number) {
  switch (movingImgNum) {
    case 1:
      return movingImg1;
    case 2:
      return movingImg2;
    case 3:
      return movingImg3;
    case 4:
      return movingImg4;
    case 5:
      return movingImg5;
    case 6:
      return movingImg6;
    case 7:
      return movingImg7;
    case 8:
      return movingImg8;
    case 9:
      return movingImg9;
    case 10:
      return movingImg10;
    case 11:
      return movingImg11;
    case 12:
      return movingImg12;
    case 13:
      return movingImg13;
    default:
      return undefined;
  }
}
