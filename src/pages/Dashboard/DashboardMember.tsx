import BarChartRender from "./components/BarChartRender";
import PieChartRender from "./components/PieChartRender";

const DashboardMember = () => {
  return (
    <div className="mb-8">
      <p className="text-2xl text-text-title mb-3">Dashboard</p>
      <div className="grid grid-cols-12 gap-4">
        <PieChartRender />
        <BarChartRender />
      </div>
    </div>
  );
};

export default DashboardMember;
