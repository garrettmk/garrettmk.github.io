import { HTMLAttributes } from "react";
import { PostMeta } from "../../lib";

export type PostProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  post: PostMeta
};

export function Post(props: PostProps) {
  const { post, className, ...divProps } = props;

  return (
    <div className={className} {...divProps}>
      <h2 className="text-4xl font-bold mb-0">
        {post.title}
      </h2>
      <h3 className="text-2xl text-green-300 mb-4">
        {post.description}
      </h3>
      <div className="text-lg mb-4">
        {post.excerpt}
      </div>
      <p className="text-sm text-green-300 underline decoration-dotted underline-offset-4">
        Read more...
      </p>
    </div>
  );
}