import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function WatchListSkeleton() {
  return (
    <SkeletonTheme
      baseColor="#1e3a8a"
      highlightColor="#3b82f6"
      borderRadius="4px"
      duration={2}
    >
      <div style={{maxHeight: '200px', overflowY: 'auto'}}>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Symbol</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Change</th>
              <th className="px-4 py-2">Change %</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2">
                  <Skeleton width={60} height={24} />
                </td>
                <td className="px-4 py-2">
                  <Skeleton width={120} height={24} />
                </td>
                <td className="px-4 py-2">
                  <Skeleton width={80} height={24} />
                </td>
                <td className="px-4 py-2">
                  <Skeleton width={60} height={24} />
                </td>
                <td className="px-4 py-2">
                  <Skeleton width={60} height={24} />
                </td>
                <td className="px-4 py-2">
                  <Skeleton circle width={24} height={24} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SkeletonTheme>
  )
}