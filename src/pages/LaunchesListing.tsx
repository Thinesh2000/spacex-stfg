import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

// types
import type { QueryOptions } from "../types/PayloadTypes";
import type { LaunchData } from "../types/ResponseTypes";

// hooks
import useDebounce from "./useDebounce";
import useSearchQuery from "../hooks/useSearchQuery";

// services
import services from "../api/services";

const LaunchesListing = () => {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 500);

  const [launchData, setLaunchData] = useState<LaunchData[]>([]);
  const [showLoadMore, setShowLoadMore] = useState(false);

  // region: Query Launch list
  const defaultOptions: QueryOptions = {
    offset: 0,
    limit: 10,
  };
  const [queryOptions, setQueryOptions] = useState<QueryOptions>(defaultOptions);
  const fetchLaunches = async () => {
    const params = {
      offset: queryOptions.offset,
      limit: queryOptions.limit,
      ...(debouncedValue ? { name: debouncedValue } : {}),
    };

    const data = await services.fetchLaunchesByQuery(params);

    // Hide Load More if fewer items than limit returned
    setShowLoadMore((data?.length ?? 0) === queryOptions.limit);

    return data;
  };

  const { data: queryData, isLoading } = useSearchQuery({
    queryKey: [debouncedValue, queryOptions.offset!.toString()],
    query: debouncedValue,
    queryFn: fetchLaunches,
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
      setLaunchData((prev) => (queryOptions.offset === 0 ? queryData : [...prev, ...queryData]));
    }
  }, [queryData, queryOptions.offset]);

  return (
    <div className="min-h-screen text-white">
      {/* Intro Section */}
      <section className="flex flex-col gap-6 justify-center px-6 py-16 min-h-screen max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-md">
          Historic Launches
        </h2>
        <p className="text-lg md:text-xl max-w-3xl text-gray-200 drop-shadow-sm">
          Relive every monumental lift-off by SpaceX. Scroll through the past missions that reshaped
          space travel, from Falcon 1 to the latest Starship tests.
        </p>
      </section>

      {/* Search and Rockets */}
      <section className="px-6 pb-20 max-w-7xl mx-auto">
        {/* Search Input */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search launches..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg bg-white/10 text-white placeholder:text-gray-400 backdrop-blur-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 🚀 Launch Cards Grid */}
        {!!launchData.length && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {launchData.map((launch) => (
              <div
                key={launch.id}
                className="relative p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white line-clamp-1">{launch.name}</h3>
                  {/* {launch.links.patch.small && (
                    <img
                      src={launch.links.patch.small}
                      alt="patch"
                      className="w-10 h-10 object-contain rounded-full border border-white/20"
                    />
                  )} */}
                </div>
                <p className="text-sm text-gray-300 mb-3 line-clamp-3">
                  {launch.details || "No details available."}
                </p>
                <p className="text-xs text-gray-400 mb-1">
                  Launch Date:{" "}
                  {new Date(launch.date_utc).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  Launch Site: {launch.launchpad?.name || "Unknown"}
                </p>
                <Link
                  to={`/launches/${launch.id}`}
                  className="inline-block text-blue-400 text-sm hover:underline"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
        {!launchData.length && !isLoading && (
          <div className="text-center text-gray-400 mt-10">
            No launches found. Try a different search term.
          </div>
        )}
        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-3 p-6 mt-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-md text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-transparent border-white/60"></div>
            <div className="text-sm text-gray-300 tracking-wide">Fetching launches...</div>
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

export default LaunchesListing;
