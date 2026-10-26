import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

interface CarouselControlsProps {
  index: number
  pageCount: number
  paused: boolean
  onPrevious: () => void
  onNext: () => void
  onGoTo: (index: number) => void
  onTogglePause: () => void
}

/** Stateless controls: callbacks and playback state come from the parent. */
export default function CarouselControls({ index, pageCount, paused, onPrevious, onNext, onGoTo, onTogglePause }: CarouselControlsProps) {
  const arrowClass = 'absolute top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-lg ring-1 ring-black/10 backdrop-blur transition hover:scale-110 hover:bg-white sm:flex'

  return (
    <>
      <button type="button" aria-label="Previous" onClick={onPrevious} className={`${arrowClass} -left-1 lg:-left-5`}><ChevronLeft className="h-5 w-5" /></button>
      <button type="button" aria-label="Next" onClick={onNext} className={`${arrowClass} -right-1 lg:-right-5`}><ChevronRight className="h-5 w-5" /></button>

      <div className="mt-4 flex items-center justify-center gap-3">
        <div className="flex flex-wrap items-center justify-center gap-2" aria-label="Carousel pagination">
          {Array.from({ length: pageCount }, (_, i) => {
            const active = i === index
            return (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={active ? 'step' : undefined}
                onClick={() => onGoTo(i)}
                className={`relative h-3 overflow-hidden rounded-full border transition-all duration-500 ${active ? 'w-8 border-black bg-neutral-200' : 'w-3 border-neutral-300 bg-white hover:border-neutral-500'}`}
              >
                {active && <span key={`${index}-${paused}`} className={`absolute inset-0 rounded-full bg-black ${paused ? '' : 'pc-bar'}`} style={paused ? { transform: 'scaleX(1)' } : undefined} />}
              </button>
            )
          })}
        </div>
        <button type="button" aria-label={paused ? 'Play' : 'Pause'} aria-pressed={paused} onClick={onTogglePause} className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition hover:bg-neutral-100">
          {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
        </button>
      </div>
    </>
  )
}
