import Typography from './Typography';

interface SearchCountTextProps {
  total: number;
  label: string;
}

const SearchCountText = ({ total, label }: SearchCountTextProps) => {
  return (
    <div className="flex gap-4 mb-6">
      <Typography variant="body1" color="text-secondary">
        {label}
      </Typography>
      <Typography variant="body1" color="text-secondary">
        총 {total}건
      </Typography>
    </div>
  );
};

export default SearchCountText;
