import { useInputState } from '../hooks';

interface Props {
  id: string;
  name: string;
}

const FieldRequiredMessage = ({ id, name }: Props) => {
  const { t } = useInputState();
  return t.formatMessage({ id }, { name: t.formatMessage({ id: name }) });
};

export { FieldRequiredMessage };
