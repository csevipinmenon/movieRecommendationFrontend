const MovieCard = ({ movie }) => {
  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full aspect-[2/3] object-cover object-center"
      />
      <div className="p-3">
        <h3 className="text-sm font-bold text-white text-center truncate">
          {movie.title}
        </h3>
      </div>
    </div>
  );
};

export default MovieCard;
