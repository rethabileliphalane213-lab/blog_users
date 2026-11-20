import { useLocation, Link } from "react-router-dom";

function FullArticle({onChange,onClick,comments}) {
    const location = useLocation();

    const article = location.state?.article;
    

    if (!article) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-slate-900">
                        Article not found
                    </h1>

                    <Link
                        to="/"
                        className="mt-6 inline-block rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">

            {/* Header */}
            <header className="bg-slate-950 px-6 py-5 text-white shadow-lg">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <h1 className="text-xl font-bold">
                        The Full-Stack <span className="text-cyan-400">Journal</span>
                    </h1>

                    <Link
                        to="/"
                        className="font-medium text-slate-300 transition hover:text-cyan-400"
                    >
                        ← Back to Journal
                    </Link>
                </div>
            </header>

            {/* Article */}
            <main className="mx-auto max-w-5xl px-6 py-12 sm:px-10 lg:px-12">

                {/* Article Header */}
                <div className="mb-10">
                    <p className="mb-4 text-sm font-bold uppercase tracking-widest text-cyan-700">
                        Developer Journal
                    </p>

                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                        {article.title}
                    </h1>
                </div>

                {/* Image */}
                {article.image && (
                    <div className="mb-12 overflow-hidden rounded-2xl bg-slate-200 shadow-xl">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="h-auto max-h-[600px] w-full object-cover"
                        />
                    </div>
                )}

                {/* Article Content */}
                <article className="rounded-2xl bg-white p-6 shadow-sm sm:p-10 lg:p-12">
                    <p className="whitespace-pre-wrap text-lg leading-8 text-slate-700 sm:text-xl sm:leading-9">
                        {article.post}
                    </p>
                </article>

               {/* Comment section */}
<div className="mt-10 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
    <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Add a Comment
    </h2>

    <form
        onSubmit={(e) => {
            e.preventDefault();
            onClick(article.id);
        }}
    >
        <div>
            <label
                htmlFor="comment"
                className="mb-2 block text-sm font-semibold text-slate-700"
            >
                Enter comment
            </label>

            <textarea
                id="comment"
                name="comment"
                onChange={onChange}
                rows={8}
                value={comments}
                placeholder="Enter your Comment here!"
                className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
            />
        </div>

        <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-cyan-700 px-6 py-3.5 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-800 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-cyan-500/20"
        >
            Add Comment
        </button>
    </form>
     {article.getComments.length === 0 ? (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center">
        <p className="text-sm font-medium text-slate-500">
            Be the first to comment
        </p>
    </div>
) : (
    <div className="mt-8 space-y-5">
        {article.getComments.map(comment => {
            return (
                <div
                    key={comment.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
                >
                    {/* Comment header */}
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-cyan-400">
                                {comment.name.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <p className="font-semibold text-slate-900">
                                    {comment.name} {comment.surname}
                                </p>

                                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                                    Reader Comment
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Comment body */}
                    <div className="border-l-2 border-cyan-500 pl-4">
                        <p className="text-base leading-7 text-slate-600">
                            {comment.comment}
                        </p>
                    </div>
                </div>
            );
        })}
    </div>
)}
</div>

                {/* Bottom Back Button */}
                <div className="mt-10">
                    <Link
                        to="/"
                        className="inline-flex items-center rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
                    >
                        ← Back to Articles
                    </Link>
                </div>

            </main>
        </div>
    );
}

export default FullArticle;