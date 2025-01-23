import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";

export default function Carousel() {
  return (
    <div>
      <ResponsiveCarousel className="mt-5">
        <div>
          <img src="assets/Home.png" alt="Image 1" />
        </div>
        <div>
          <img src="assets/Home.png" alt="Image 2" />
        </div>
        <div>
          <img src="assets/Home.png" alt="Image 3" />
        </div>
      </ResponsiveCarousel>
    </div>
  );
}
