import { useEffect, useState } from "react";
import "../styles/courseSection.css";
import axios from "axios";
import { Disc, DiscStateString } from "../App";
import CourseSectionDiscs from "./CourseSectionDiscs";

interface FilterCriteria {
  brands: string[];
  colors: string[];
  discNames: string[];
}

interface CourseSectionProps {
  filters: FilterCriteria;
  setFilters: (filters: FilterCriteria) => void;
  currentSort: string;
  handleSortToggle: () => void;
  selectedCourseId: string | null;
  displayedDiscsCards: Disc[]; 
}

export default function CourseSection({
  filters,
  currentSort,
  selectedCourseId,
}: CourseSectionProps) {
  const [allDiscs, setAllDiscs] = useState<Disc[]>([]);
  const [filteredDiscs, setFilteredDiscs] = useState<Disc[]>([]);
  const [displayedDiscs, setDisplayedDiscs] = useState<Disc[]>([]);
  const [showLoadMore, setShowLoadMore] = useState(true);

  useEffect(() => {
    const fetchDiscs = async () => {
      try {
        const response = await axios.get(
          "https://api.discrescuenetwork.com/inventory"
        );
        setAllDiscs(response.data); // Assuming the API response directly contains the array of discs
      } catch (error) {
        console.error("Failed to fetch discs:", error);
      }
    };

    fetchDiscs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [allDiscs, filters, currentSort, selectedCourseId]);

  const applyFilters = () => {
    const filteredDiscs = allDiscs.filter((disc) => {
      const brand = disc.brand || "";
      const color = disc.color || "";
      const discName = disc.disc || "";

      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(brand);
      const matchesColor =
        filters.colors.length === 0 || filters.colors.includes(color);
      const matchesDiscName =
        filters.discNames.length === 0 || filters.discNames.includes(discName);

      return (
        (disc.status === DiscStateString.New ||
          disc.status === DiscStateString.Unclaimed) &&
        matchesBrand &&
        matchesColor &&
        matchesDiscName &&
        (!selectedCourseId || disc.course === selectedCourseId) 
      );
    });

    const sortedDiscs = filteredDiscs.sort((a, b) => {
      if (currentSort === "asc") {
        return a.disc.localeCompare(b.disc);
      } else {
        return b.disc.localeCompare(a.disc);
      }
    });

    setFilteredDiscs(sortedDiscs); 
    setDisplayedDiscs(sortedDiscs.slice(0, 6)); 
    setShowLoadMore(sortedDiscs.length > 6); 
  };

  const loadMore = () => {
    const nextIndex = displayedDiscs.length + 6;
    const nextDiscs = filteredDiscs.slice(0, nextIndex)
      .filter(
        (disc) =>
          disc.status === DiscStateString.New ||
          disc.status === DiscStateString.Unclaimed
      )
      .slice(0, nextIndex);

    const sortedNextDiscs = nextDiscs.sort((a, b) => {
      if (currentSort === "asc") {
        return a.disc.localeCompare(b.disc);
      } else {
        return b.disc.localeCompare(a.disc);
      }
    });

    setDisplayedDiscs(sortedNextDiscs);
    setShowLoadMore(nextIndex < allDiscs.length);

    if (nextDiscs.length === 0) {
      setDisplayedDiscs([]); 
    }
  };

  return (
    <div className="course-section">
      <CourseSectionDiscs arrayOfDiscs={displayedDiscs} />
      {showLoadMore && (
        <div className="load-more">
          <a className="more-btn" onClick={loadMore}>
            Load More
          </a>
        </div>
      )}
      {displayedDiscs.length === 0 && (
        <p className="no-results-message">No results for {selectedCourseId}</p>
      )}
    </div>
  );
}
