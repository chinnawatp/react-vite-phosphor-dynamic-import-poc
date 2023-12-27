import { lazy, Suspense } from 'react';
import { IconProps } from '@phosphor-icons/react';

const ICONS_PATH = '../node_modules/@phosphor-icons/react/dist/csr';
const ICON_EXTENSION = '.mjs';

const lazyIconMap = import.meta.glob('../node_modules/@phosphor-icons/react/dist/csr/*.mjs');

type Props = IconProps & { name: string };

const LazyIcon = ({ name, ...iconProps }: Props) => {
  const Icon = lazy(async () => {
    const module: any = await lazyIconMap[`${ICONS_PATH}/${name}${ICON_EXTENSION}`]();
    return {
      default: module[name]
    };
  });

  return (
    <Suspense fallback={null}>
      <Icon {...iconProps} />
    </Suspense>
  );
};

export default LazyIcon;