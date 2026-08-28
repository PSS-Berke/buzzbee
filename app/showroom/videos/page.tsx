import { homeLineProducts } from '@/data/products';
import ShowroomPlayer from '@/components/product/ShowroomPlayer';

/**
 * The floor tablet page. Rob asked for somewhere to hand a customer a video
 * while he finishes with someone else, so this is built for a propped-up iPad:
 * big tap targets, dark ground so the room doesn't glare off it, and nothing
 * to navigate. Add a `video` to a product in data/products.ts and it shows up
 * here automatically.
 */
export default function ShowroomVideosPage() {
  const withVideo = homeLineProducts.filter((p) => p.video);

  return (
    <main className="min-h-screen bg-navy text-white">
      <div className="max-w-5xl mx-auto px-5 py-10 sm:px-8 sm:py-14">
        <h1 className="font-serif text-3xl sm:text-4xl">Showroom videos</h1>
        <p className="mt-2 text-white/60">
          Tap a mattress to play. Sound is on.
        </p>

        {withVideo.length === 0 ? (
          <p className="mt-10 text-white/60">No videos have been added yet.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {withVideo.map((p) => (
              <ShowroomPlayer
                key={p.slug}
                src={p.video!.src}
                poster={p.video!.poster}
                name={p.name}
                tagline={p.tagline}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
