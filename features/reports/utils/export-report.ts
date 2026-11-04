import writeXlsxFile, { Row } from 'write-excel-file/browser';

const reportTables = (): HTMLTableElement[] =>
  Array.from(document.querySelectorAll('main table')).filter(
    (table): table is HTMLTableElement => table instanceof HTMLTableElement,
  );

const tableToRows = (table: HTMLTableElement): string[][] =>
  Array.from(table.querySelectorAll('tr')).map((tr) =>
    Array.from(tr.querySelectorAll('th, td')).map((cell) => cell.textContent?.trim() ?? ''),
  );

const download = (content: BlobPart, mime: string, filename: string) => {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
};

export const exportVisibleReport = async (
  format: 'xlsx' | 'csv',
  filename: string,
): Promise<void> => {
  const tables = reportTables();
  if (tables.length === 0) throw new Error('No report table is currently available to export');
  const safeName = filename.replace(/[^a-z0-9-_]+/gi, '-').toLowerCase();

  if (format === 'xlsx') {
    if (tables.length === 1) {
      const rawRows = tableToRows(tables[0]!);
      const data: Row[] = rawRows.map((row, rowIdx) =>
        row.map((cell) =>
          rowIdx === 0
            ? { value: cell, type: String, fontWeight: 'bold' as const }
            : { value: cell, type: String },
        ),
      );
      await writeXlsxFile(data).toFile(`${safeName}.xlsx`);
      return;
    }

    const sheets = tables.map((table, index) => {
      const rawRows = tableToRows(table);
      const data: Row[] = rawRows.map((row, rowIdx) =>
        row.map((cell) =>
          rowIdx === 0
            ? { value: cell, type: String, fontWeight: 'bold' as const }
            : { value: cell, type: String },
        ),
      );
      return {
        sheet: `Report ${index + 1}`,
        data,
      };
    });

    await writeXlsxFile(sheets).toFile(`${safeName}.xlsx`);
    return;
  }

  const csv = tables
    .map((table, index) => {
      const rows = tableToRows(table);
      const csvRows = rows.map((row) =>
        row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','),
      );
      return `Report ${index + 1}\n${csvRows.join('\n')}`;
    })
    .join('\n\n');

  download(`\uFEFF${csv}`, 'text/csv;charset=utf-8', `${safeName}.csv`);
};
