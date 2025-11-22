import * as React from "react";
import { useNavigate } from "react-router-dom";


// Image imports
import bike from "../images/bike.jpeg";
import car from "../images/car.jpeg";
import cycle from "../images/cycle.jpeg";

// Vehicle data
const vehicleData = [
  { title: "Cars", image: car, description: "Explore a range of rental cars.", route: "/cars" },
  { title: "Bikes", image: bike, description: "Rent motorcycles for quick rides.", route: "/bikes" },
  { title: "Cycles", image: cycle, description: "Healthy and eco-friendly cycle rentals.", route: "/cycles" },
];

function Cards() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gray-100 p-50 flex justify-evenly items-center flex-wrap gap-x-20 gap-y-20">
      {vehicleData.map((vehicle, index) => (
        <div
          key={index}
          onClick={() => navigate(vehicle.route)}
          className="relative flex flex-col items-center justify-start cursor-pointer rounded-lg p-[3px]"
          style={{
            "--card-height": "450px",
            "--rotate": "132deg",
          }}
        >
          {/* Glowing animated border */}
          <div
            className="absolute w-[104%] h-[102%] rounded-lg top-[-1%] left-[-2%] z-[-1] animate-[spin-gradient_2.5s_linear_infinite]"
            style={{
              backgroundImage:
                "linear-gradient(var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2)",
            }}
          ></div>

          {/* Glowing blur shadow */}
          <div
            className="absolute z-[-1] top-[calc(var(--card-height)/6)] left-0 right-0 h-full w-full m-auto scale-[0.8] blur-[calc(var(--card-height)/6)] animate-[spin-gradient_2.5s_linear_infinite]"
            style={{
              backgroundImage:
                "linear-gradient(var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2)",
            }}
          ></div>

          {/* Card Content */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 w-[345px] h-[350px] overflow-hidden">
            <img
              src={vehicle.image}
              alt={vehicle.title}
              className="h-[180px] w-full object-cover object-center rounded-t-lg"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold mb-2">{vehicle.title}</h2>
              <p className="text-gray-600 text-sm">{vehicle.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
