import GameCard from "@/components/GameCard";
import { faCircleNotch, faCross, faRankingStar, faX } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <GameCard 
        title="wheel"
        icon={faCircleNotch}
      />
      <GameCard
        title="bracket"
        iconString="{"
      />
      <GameCard
        title="elimination"
        icon={faX}
      />
      <GameCard
        title="ranking"
        icon={faRankingStar}
      />
    </div>
  );
}
