import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

// types
import type { QueryOptions } from "../types/PayloadTypes";
import type { RocketDetails } from "../types/ResponseTypes";

// hooks
import useDebounce from "./useDebounce";
import useSearchQuery from "../hooks/useSearchQuery";

// services
import services from "../api/services";

const RocketsListing = () => {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 200);

  const [rocketData, setRocketData] = useState<RocketDetails[]>([]);
  const [showLoadMore, setShowLoadMore] = useState(false);

  // region: Query Launch list
  const defaultOptions: QueryOptions = {
    offset: 0,
    limit: 10,
  };
  const [queryOptions, setQueryOptions] = useState<QueryOptions>(defaultOptions);
  const fetchRockets = async () => {
    const params = {
      offset: queryOptions.offset,
      limit: queryOptions.limit,
      ...(debouncedValue ? { name: debouncedValue } : {}),
    };

    const data = await services.fetchRocketsByQuery(params);

    // Hide Load More if fewer items than limit returned
    setShowLoadMore((data?.length ?? 0) === queryOptions.limit);

    return data;
  };

  const { data: queryData, isLoading } = useSearchQuery({
    queryKey: [debouncedValue, queryOptions.offset!.toString()],
    query: debouncedValue,
    queryFn: fetchRockets,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setQueryOptions({ ...defaultOptions }); // reset pagination
  };

  const handleLoadMore = () => {
    setQueryOptions((prev) => ({
      ...prev,
      offset: (prev.offset ?? 0) + (prev.limit ?? 10),
    }));
  };

  useEffect(() => {
    if (queryData) {
      setRocketData((prev) => (queryOptions.offset === 0 ? queryData : [...prev, ...queryData]));
    }
  }, [queryData, queryOptions.offset]);

  return (
    <div className="min-h-screen text-white">
      {/* Intro Section */}
      <section className="flex flex-col gap-6 justify-center px-6 py-16 min-h-screen max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-md">
          The Rockets of SpaceX
        </h2>
        <p className="text-lg md:text-xl max-w-3xl text-gray-200 drop-shadow-sm">
          Explore the engineering marvels behind SpaceX’s ambitious missions — from Falcon 1 to the
          interplanetary Starship. Learn more about their specs, missions, and first flights.
        </p>
      </section>

      {/* Search and Rockets */}
      <section className="px-6 pb-20 max-w-7xl mx-auto">
        {/* Search Input */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search rockets..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg bg-white/10 text-white placeholder:text-gray-400 backdrop-blur-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Rockets Grid */}
        {!!rocketData.length && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rocketData.map((rocket) => (
              <div
                key={rocket.id}
                className="p-6 bg-white/5 rounded-xl border border-white/10 shadow-lg backdrop-blur-md hover:scale-[1.02] transition-all duration-200"
              >
                <h3 className="text-xl font-semibold mb-2">{rocket.name}</h3>
                <p className="text-sm text-gray-300 mb-3 line-clamp-3">{rocket.description}</p>
                <div className="text-sm text-gray-400 mb-4">
                  <p>
                    Height: <span className="font-semibold">{rocket?.height?.meters ?? "N/A"}</span>{" "}
                    m
                  </p>
                  <p>
                    Mass: <span className="font-semibold">{rocket?.mass?.kg ?? "N/A"}</span> kg
                  </p>
                  <p>
                    First flight:{" "}
                    <span className="font-semibold">{rocket?.first_flight ?? "N/A"}</span>
                  </p>
                </div>
                <Link
                  to={`/rockets/${rocket.id}`}
                  className="inline-block text-blue-400 text-sm hover:underline"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
        {!rocketData.length && !isLoading && (
          <div className="text-center text-gray-400 mt-10">
            No rockets found. Try a different search term.
          </div>
        )}
        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-3 p-6 mt-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-md text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-transparent border-white/60"></div>
            <div className="text-sm text-gray-300 tracking-wide">Fetching rockets...</div>
          </div>
        )}

        {/* Load more... */}
        {showLoadMore && !isLoading && (
          <div className="flex justify-center w-full">
            <button
              type="button"
              className="relative flex items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-200 mt-5 cursor-pointer font-semibold text-white"
              onClick={handleLoadMore}
            >
              <span>Load more</span>
              <IoIosArrowDown className="text-lg" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default RocketsListing;
