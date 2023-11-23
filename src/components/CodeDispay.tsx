import Prism from 'prismjs';
import 'prismjs/themes/prism-coy.min.css';
import * as prettier from 'prettier';
import htmlPlugin from 'prettier/plugins/html';
import cssPlugin from 'prettier/plugins/postcss';
import { useEffect, useState } from 'react';

export const CodeDisplay: React.FC<{ code: string; language: 'html' | 'css' }> = ({ code, language }) => {
  const [formattedCode, setFormattedCode] = useState<string>('');

  useEffect(() => {
    format();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, language]);

  async function format() {
    setFormattedCode(await prettier.format(code, { parser: language, plugins: [htmlPlugin, cssPlugin] }));
  }

  // Returns a highlighted HTML string
  const html = Prism.highlight(formattedCode, Prism.languages[language], language);

  return (
    <pre className='text-xs'>
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
};
