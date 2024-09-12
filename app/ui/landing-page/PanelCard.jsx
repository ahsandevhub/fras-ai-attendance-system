import Image from "next/image";
import Link from "next/link";

const PanelCard = ({ title, text, image, link, button }) => {
  return (
    <div className="relative flex h-auto w-full flex-col justify-between space-y-4 rounded-lg bg-gray-100 p-3 transition-all hover:shadow-lg md:w-[45%] xl:w-[31%]">
      <div className="text rounded border-l-[8px] border-blue-600 pl-3">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-500">{text}</p>
      </div>
      <div className="group relative overflow-hidden rounded-lg">
        <div className="overflow-hidden rounded-lg">
          <Image src={image} alt={title} className="" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Link
            href={link}
            className="rounded-full bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-700"
          >
            {button}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PanelCard;
