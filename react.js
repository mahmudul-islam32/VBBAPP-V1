import React, { useState, useEffect } from "react";

const API_URL = "https://v5.vbb.transport.rest/stops/nearby";

function SearchStops() {
  const [stops, setStops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarkedStops, setBookmarkedStops] = useState([]);
  const [selectedStop, setSelectedStop] = useState({});

  useEffect(() => {
    fetch(`${API_URL}?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => setStops(data));
  }, [searchTerm]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleStopSelection = stop => {
    setSelectedStop(stop);
  };

  const handleBookmark = stop => {
    setBookmarkedStops([...bookmarkedStops, stop]);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearch} />
      <ul>
        {stops.map(stop => (
          <li key={stop.id} onClick={() => handleStopSelection(stop)}>
            {stop.name}
            <button onClick={() => handleBookmark(stop)}>Bookmark</button>
          </li>
        ))}
      </ul>
      {selectedStop.name && (
        <StopDetails stop={selectedStop} bookmarked={bookmarkedStops.includes(selectedStop)} />
      )}
      {bookmarkedStops.length > 0 && (
        <BookmarkedStops stops={bookmarkedStops} />
      )}
    </div>
  );
}

function StopDetails({ stop, bookmarked }) {
  return (
    <div>
      <h2>{stop.name}</h2>
      <p>Transport Options: {stop.transport.join(", ")}</p>
      {bookmarked && <p>Bookmarked</p>}
      <h3>Departures:</h3>
      <ul>
        {stop.departures.map(departure => (
          <li key={departure.id}>
            {departure.line.name} ({departure.direction}) - {departure.when}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BookmarkedStops({ stops }) {
  return (
    <div>
      <h2>Bookmarked Stops:</h2>
      <ul>
        {stops.map(stop => (
          <li key={stop.id}>{stop.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchStops;
