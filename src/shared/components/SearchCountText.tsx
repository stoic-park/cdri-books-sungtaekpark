import Typography from './Typography';

interface SearchCountTextProps {
  total: number;
  label: string;
}

const SearchCountText = ({ total, label }: SearchCountTextProps) => {
  return (
    <div className="flex gap-4 mb-6">
      <Typography variant="caption" color="text-primary">
        {label}
      </Typography>
      <div className="flex items-center gap-1">
        <Typography variant="caption" color="text-primary">
          총
        </Typography>
        <Typography variant="caption" color="primary">
          {total}
        </Typography>
        <Typography variant="caption" color="text-primary">
          건
        </Typography>
      </div>
    </div>
  );
};

export default SearchCountText;
