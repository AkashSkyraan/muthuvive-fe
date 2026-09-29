import React, { useState } from "react";
import icons from "../../config/Icons.jsx";
import { CircleSmall } from "lucide-react";
import { useLoginModal } from "../../context/LoginModalContext.jsx";

// Renders a singling card. Pass one `listing` object with
// { id, image, category, title, price, address, area, hospitals, schools }.
const ProjectCard = ({ listing, user }) => {

  console.log(listing, "lis")
  const { openLoginModal } = useLoginModal();

  const [isBookmarked, setIsBookmarked] = useState(
    Boolean(listing?.is_bookmarked),
  );

  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const handleBookmark = async (event) => {
    // Prevent card click
    event.preventDefault();
    event.stopPropagation();

    // Not logged in
    if (!user) {
      openLoginModal();
      return;
    }

    // Prevent multiple clicks
    if (bookmarkLoading) {
      return;
    }

    try {
      setBookmarkLoading(true);

      const response = await AxiosInstance.post("/properties/bookmark", {
        prop_id: listing.prop_id,
      });

      if (response?.data?.success === 1) {
        setIsBookmarked((prev) => !prev);

        message.success(
          isBookmarked
            ? "Property removed from bookmarks"
            : "Property added to bookmarks",
        );
      } else {
        message.error(response?.data?.message || "Unable to update bookmark");
      }
    } catch (error) {
      console.error("Bookmark Error:", error);

      message.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setBookmarkLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100 cursor-pointer">
      <div className="relative h-48 sm:h-44 lg:h-48">
        <img
          src={listing?.cover_image?.url}
          alt={listing.prop_name}
          className="w-full h-full object-cover"
        />

        <button
          className={`absolute top-2 right-2 w-8 h-8 rounded-md flex items-center justify-center hover:cursor-pointer `}
          onClick={handleBookmark}
          disabled={bookmarkLoading}
        >
          <img
            src={isBookmarked ? icons.bookmarkIconFilled : icons.bookmarkIcon}
            alt="bookmark"
            className="w-5 h-5"
          />
        </button>

        <span className="absolute bottom-3 right-3 bg-white text-secondary text-sm font-medium px-3 py-1 rounded-md">
          {listing.category_name}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900">
          {listing.prop_name}
        </h3>

        {/* Show price only if category_name is dtcp or farmland */}
        {(listing.category_name === "dtcp" ||
          listing.category_name === "farmland") && (
          <p className="text-secondary text-base font-semibold mt-1">
            Starts from{" "}
            <span className="inline-flex items-center">
              <span className="mr-1">₹</span>
              {Number(listing.min_price).toLocaleString("en-IN")}
            </span>
          </p>
        )}

        <div className="flex items-start gap-x-2 mt-3 w-[95%]">
          <img
            src={icons.locationBlackIcon}
            alt="location"
            className="w-4 h-4 mt-0.5 shrink-0"
          />
          <span
            className="text-sm text-gray-500 truncate"
            title={[listing.city, listing.district, listing.state]
              .filter(Boolean)
              .join(", ")}
          >
            {listing.city}, {listing.district}, {listing.state}
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-3 pt-4 justify-around">
          {/* Highlight */}
          <div className="flex items-center gap-x-1.5 max-w-[45%]">
            <CircleSmall className="w-5 h-5 shrink-0" />

            <span
              className="text-sm text-gray-500 truncate"
              title={listing?.highlights?.name}
            >
              {listing?.highlights?.name}
            </span>
          </div>

          {/* Amenity */}
          <div className="flex items-center gap-x-1.5 max-w-[45%]">
            <CircleSmall className="w-5 h-5 shrink-0" />

            <span
              className="text-sm text-gray-500 truncate"
              title={listing?.amenities?.name}
            >
              {listing?.amenities?.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
