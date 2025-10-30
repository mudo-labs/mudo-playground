import movingImg1 from '../assets/home/moving-img-1.webp';
import movingImg2 from '../assets/home/moving-img-2.webp';
import movingImg3 from '../assets/home/moving-img-3.webp';
import movingImg4 from '../assets/home/moving-img-4.webp';
import movingImg5 from '../assets/home/moving-img-5.webp';
import movingImg6 from '../assets/home/moving-img-6.webp';
import movingImg7 from '../assets/home/moving-img-7.webp';
import movingImg8 from '../assets/home/moving-img-8.webp';
import movingImg9 from '../assets/home/moving-img-9.webp';
import movingImg10 from '../assets/home/moving-img-10.webp';
import movingImg11 from '../assets/home/moving-img-11.webp';
import movingImg12 from '../assets/home/moving-img-12.webp';
import movingImg13 from '../assets/home/moving-img-13.webp';

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
