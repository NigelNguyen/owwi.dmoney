import React, { useEffect, useState } from "react";

type TAnimationPoint = {
  id: number;
  size: number;
  top: number;
  left: number;
  animationDuration: number;
};

const RandomPointsBackground = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [points, setPoints] = useState<Array<TAnimationPoint>>([]);

  useEffect(() => {
    const generatePoints = () => {
      const pointArray = [];
      for (let i = 0; i < 20; i++) {
        const size = Math.random() * 10 + 2;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 5 + 5;

        pointArray.push({
          id: i,
          size,
          top,
          left,
          animationDuration,
        });
      }
      setPoints(pointArray);
    };

    generatePoints();
  }, []);

  return (
    <div className="relative w-full h-full">
      {points.map((point) => (
        <div
          key={point.id}
          className="absolute bg-blue-400 rounded-full"
          style={{
            width: `${point.size}px`,
            height: `${point.size}px`,
            top: `${point.top}%`,
            left: `${point.left}%`,
            animation: `move ${point.animationDuration}s infinite alternate`,
            boxShadow: "0 0 3px 1px #fff",
          }}
        ></div>
      ))}
      {children}
    </div>
  );
};

export default RandomPointsBackground;
