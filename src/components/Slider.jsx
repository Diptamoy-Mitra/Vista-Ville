import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";


export default function Slider() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const navigate = useNavigate()
  useEffect(() => {
    async function fetchListings() {
      const listingRef = collection(db, "listings");
      const q = query(listingRef, orderBy("timestamp", "desc", limit(6)))
      const querySnap = await getDocs(q)
      let listings = []
      querySnap.forEach(doc => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      });
      setListings(listings)
      setLoading(false)
    }
    fetchListings()
  }, [])

  if (loading) {
    return <Spinner />
  }
  if (listings.length === 0) {
    return <></>
  }

  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 3000 }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imgUrls[Math.floor(Math.random() * data.imgUrls.length)]}) center, no-repeat`,
                  backgroundSize: "cover",
                }}
                className="relative w-full h-[300px] overflow-hidden  mb-2 ml-1 mr-1"
              ></div>
              <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl">{data.name}</p>
              <p className="text-[#f1faee] absolute left-1 bottom-3 font-medium max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl">${data.discountedPrice ?? data.regularPrice}
                {data.type === "rent" && " / month"}
              </p>

            </SwiperSlide>
          ))
          }
        </Swiper>
      </>
    )
  );
}


//4:06:58 //2 nov