import { Link } from "react-router-dom";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/solid";

interface BlogCardInterface {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  blogid: string;
  like: number;
  dislike: number;
}

const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  blogid,
  like,
  dislike,
}: BlogCardInterface) => {
  const parser = new DOMParser();
  const titleText =
    parser.parseFromString(title, "text/html").body.textContent || "";
  const contentText =
    parser.parseFromString(content, "text/html").body.textContent || "";

  return (
    <Link
      to={`/blog/${blogid}`}
      className="block transform transition-transform hover:scale-105">
      <div className="flex flex-col sm:flex-row max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-300 overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="flex-1 p-4">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center mb-4 md:mb-0">
              <AvatarComponent name={authorName} />
            </div>
            <div className="ml-4 text-gray-800">
              <div className="flex flex-col md:flex-row">
                <div>
                  <span className="font-semibold text-lg">{authorName}</span>
                  <div className="text-sm text-gray-500">
                    {publishedDate} ·{" "}
                    <span className="inline-block bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Member-only
                    </span>
                  </div>
                </div>
                <div className="flex flex-row gap-6 bg-gray-100 mx-auto my-auto p-2 rounded-xl">
                  <div className="flex flex-row gap-2">
                    <HandThumbUpIcon className="h-6 w-5 text-gray-600" />
                    <span>{like}</span>
                  </div>
                  <div className="flex flex-row gap-2">
                    <HandThumbDownIcon className="h-6 w-5 text-gray-600" />
                    <span>{dislike}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
              {titleText}
            </h1>
          </div>
          <div className="text-gray-700 mb-4 line-clamp-3">{contentText}</div>
          <div className="text-gray-500 text-sm">
            {`${Math.ceil(content.length / 60)} seconds read`}
          </div>
        </div>
      </div>
    </Link>
  );
};

function AvatarComponent({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-200 rounded-full">
      <span className="font-medium text-gray-600 text-lg">{name[0]}</span>
    </div>
  );
}

export default BlogCard;
