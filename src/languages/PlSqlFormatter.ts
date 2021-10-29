import Formatter from '../core/Formatter';
import { isBy, isLateral, isSet, Token } from '../core/token'; // convert to partial type import in TS 4.5
import Tokenizer from '../core/Tokenizer';
import tokenTypes from '../core/tokenTypes';

const reservedWords = [
	// 'A',
	'ACCESSIBLE',
	'AGENT',
	'AGGREGATE',
	'ALL',
	'ALTER',
	'ANY',
	'ARRAY',
	'AS',
	'ASC',
	'AT',
	'ATTRIBUTE',
	'AUTHID',
	'AVG',
	'BETWEEN',
	'BFILE_BASE',
	'BINARY',
	'BINARY_INTEGER',
	'BLOB_BASE',
	'BLOCK',
	'BODY',
	'BOOLEAN',
	'BOTH',
	'BOUND',
	'BREADTH',
	'BULK',
	'BY',
	'BYTE',
	// 'C',
	'CALL',
	'CALLING',
	'CASCADE',
	'CHAR',
	'CHARACTER',
	'CHARSET',
	'CHARSETFORM',
	'CHARSETID',
	'CHAR_BASE',
	'CHECK',
	'CLOB_BASE',
	'CLONE',
	'CLOSE',
	'CLUSTER',
	'CLUSTERS',
	'COALESCE',
	'COLAUTH',
	'COLLECT',
	'COLUMNS',
	'COMMENT',
	'COMMIT',
	'COMMITTED',
	'COMPILED',
	'COMPRESS',
	'CONNECT',
	'CONSTANT',
	'CONSTRUCTOR',
	'CONTEXT',
	'CONTINUE',
	'CONVERT',
	'COUNT',
	'CRASH',
	'CREATE',
	'CREDENTIAL',
	'CURRENT',
	'CURRVAL',
	'CURSOR',
	'CUSTOMDATUM',
	'DANGLING',
	'DATA',
	'DATE',
	'DATE_BASE',
	'DAY',
	'DECIMAL',
	'DEFAULT',
	'DEFINE',
	'DEPTH',
	'DESC',
	'DETERMINISTIC',
	'DIRECTORY',
	'DISTINCT',
	'DO',
	'DOUBLE',
	'DROP',
	'DURATION',
	'ELEMENT',
	'ELSIF',
	'EMPTY',
	'ESCAPE',
	'EXCEPTIONS',
	'EXCLUSIVE',
	'EXECUTE',
	'EXISTS',
	'EXIT',
	'EXTENDS',
	'EXTERNAL',
	'EXTRACT',
	'FALSE',
	'FETCH',
	'FINAL',
	'FIRST',
	'FIXED',
	'FLOAT',
	'FOR',
	'FORALL',
	'FORCE',
	'FUNCTION',
	'GENERAL',
	'GOTO',
	'GRANT',
	'GROUP',
	'HASH',
	'HEAP',
	'HIDDEN',
	'HOUR',
	'IDENTIFIED',
	'IF',
	'IMMEDIATE',
	'IN',
	'INCLUDING',
	'INDEX',
	'INDEXES',
	'INDICATOR',
	'INDICES',
	'INFINITE',
	'INSTANTIABLE',
	'INT',
	'INTEGER',
	'INTERFACE',
	'INTERVAL',
	'INTO',
	'INVALIDATE',
	'IS',
	'ISOLATION',
	'JAVA',
	'LANGUAGE',
	'LARGE',
	'LEADING',
	'LENGTH',
	'LEVEL',
	'LIBRARY',
	'LIKE',
	'LIKE2',
	'LIKE4',
	'LIKEC',
	'LIMITED',
	'LOCAL',
	'LOCK',
	'LONG',
	'MAP',
	'MAX',
	'MAXLEN',
	'MEMBER',
	'MERGE',
	'MIN',
	'MINUTE',
	'MLSLABEL',
	'MOD',
	'MODE',
	'MONTH',
	'MULTISET',
	'NAME',
	'NAN',
	'NATIONAL',
	'NATIVE',
	'NATURAL',
	'NATURALN',
	'NCHAR',
	'NEW',
	'NEXTVAL',
	'NOCOMPRESS',
	'NOCOPY',
	'NOT',
	'NOWAIT',
	'NULL',
	'NULLIF',
	'NUMBER',
	'NUMBER_BASE',
	'OBJECT',
	'OCICOLL',
	'OCIDATE',
	'OCIDATETIME',
	'OCIDURATION',
	'OCIINTERVAL',
	'OCILOBLOCATOR',
	'OCINUMBER',
	'OCIRAW',
	'OCIREF',
	'OCIREFCURSOR',
	'OCIROWID',
	'OCISTRING',
	'OCITYPE',
	'OF',
	'OLD',
	'ONLY',
	'OPAQUE',
	'OPEN',
	'OPERATOR',
	'OPTION',
	'ORACLE',
	'ORADATA',
	'ORDER',
	'ORGANIZATION',
	'ORLANY',
	'ORLVARY',
	'OTHERS',
	'OUT',
	'OVERLAPS',
	'OVERRIDING',
	'PACKAGE',
	'PARALLEL_ENABLE',
	'PARAMETER',
	'PARAMETERS',
	'PARENT',
	'PARTITION',
	'PASCAL',
	'PCTFREE',
	'PIPE',
	'PIPELINED',
	'PLS_INTEGER',
	'PLUGGABLE',
	'POSITIVE',
	'POSITIVEN',
	'PRAGMA',
	'PRECISION',
	'PRIOR',
	'PRIVATE',
	'PROCEDURE',
	'PUBLIC',
	'RAISE',
	'RANGE',
	'RAW',
	'READ',
	'REAL',
	'RECORD',
	'REF',
	'REFERENCE',
	'RELEASE',
	'RELIES_ON',
	'REM',
	'REMAINDER',
	'RENAME',
	'RESOURCE',
	'RESULT',
	'RESULT_CACHE',
	'RETURN',
	'RETURNING',
	'REVERSE',
	'REVOKE',
	'ROLLBACK',
	'ROW',
	'ROWID',
	'ROWNUM',
	'ROWTYPE',
	'SAMPLE',
	'SAVE',
	'SAVEPOINT',
	'SB1',
	'SB2',
	'SB4',
	'SEARCH',
	'SECOND',
	'SEGMENT',
	'SELF',
	'SEPARATE',
	'SEQUENCE',
	'SERIALIZABLE',
	'SHARE',
	'SHORT',
	'SIZE',
	'SIZE_T',
	'SMALLINT',
	'SOME',
	'SPACE',
	'SPARSE',
	'SQL',
	'SQLCODE',
	'SQLDATA',
	'SQLERRM',
	'SQLNAME',
	'SQLSTATE',
	'STANDARD',
	'START',
	'STATIC',
	'STDDEV',
	'STORED',
	'STRING',
	'STRUCT',
	'STYLE',
	'SUBMULTISET',
	'SUBPARTITION',
	'SUBSTITUTABLE',
	'SUBTYPE',
	'SUCCESSFUL',
	'SUM',
	'SYNONYM',
	'SYSDATE',
	'TABAUTH',
	'TABLE',
	'TDO',
	'THE',
	'TIME',
	'TIMESTAMP',
	'TIMEZONE_ABBR',
	'TIMEZONE_HOUR',
	'TIMEZONE_MINUTE',
	'TIMEZONE_REGION',
	'TO',
	'TRAILING',
	'TRANSACTION',
	'TRANSACTIONAL',
	'TRIGGER',
	'TRUE',
	'TRUSTED',
	'TYPE',
	'UB1',
	'UB2',
	'UB4',
	'UID',
	'UNDER',
	'UNIQUE',
	'UNPLUG',
	'UNSIGNED',
	'UNTRUSTED',
	'USE',
	'USER',
	'USING',
	'VALIDATE',
	'VALIST',
	'VALUE',
	'VARCHAR',
	'VARCHAR2',
	'VARIABLE',
	'VARIANCE',
	'VARRAY',
	'VARYING',
	'VIEW',
	'VIEWS',
	'VOID',
	'WHENEVER',
	'WHILE',
	'WORK',
	'WRAPPED',
	'WRITE',
	'YEAR',
	'ZONE',
];

const reservedTopLevelWords = [
	'ADD',
	'ALTER COLUMN',
	'ALTER TABLE',
	'BEGIN',
	'CONNECT BY',
	'DECLARE',
	'DELETE FROM',
	'DELETE',
	'END',
	'EXCEPT',
	'EXCEPTION',
	'FETCH FIRST',
	'FROM',
	'GROUP BY',
	'HAVING',
	'INSERT INTO',
	'INSERT',
	'LIMIT',
	'LOOP',
	'MODIFY',
	'ORDER BY',
	'SELECT',
	'SET CURRENT SCHEMA',
	'SET SCHEMA',
	'SET',
	'START WITH',
	'UPDATE',
	'VALUES',
	'WHERE',
	'WITH',
];

const reservedTopLevelWordsNoIndent = [
	'INTERSECT',
	'INTERSECT ALL',
	'INTERSECT DISTINCT',
	'UNION',
	'UNION ALL',
	'UNION DISTINCT',
	'EXCEPT',
	'EXCEPT ALL',
	'EXCEPT DISTINCT',
	'MINUS',
	'MINUS ALL',
	'MINUS DISTINCT',
];

/**
 * keywords that follow a previous Statement, must be attached to subsequent data
 * can be fully inline or on newline with optional indent
 */
const reservedDependentClauses = ['ON', 'WHEN', 'THEN', 'ELSE'];

const reservedNewlineWords = [
	'AND',
	'OR',
	'XOR',
	'CROSS APPLY',
	'OUTER APPLY',
	// joins
	'JOIN',
	'INNER JOIN',
	'LEFT JOIN',
	'LEFT OUTER JOIN',
	'RIGHT JOIN',
	'RIGHT OUTER JOIN',
	'FULL JOIN',
	'FULL OUTER JOIN',
	'CROSS JOIN',
	'NATURAL JOIN',
];

export default class PlSqlFormatter extends Formatter {
	tokenizer() {
		return new Tokenizer({
			reservedWords,
			reservedTopLevelWords,
			reservedNewlineWords,
			reservedDependentClauses,
			reservedTopLevelWordsNoIndent,
			stringTypes: [`""`, "N''", "''", '``'],
			openParens: ['(', 'CASE'],
			closeParens: [')', 'END'],
			indexedPlaceholderTypes: ['?'],
			namedPlaceholderTypes: [':'],
			lineCommentTypes: ['--'],
			specialWordChars: ['_', '$', '#', '.', '@'],
			operators: ['||', '**', '!=', ':='],
		});
	}

	tokenOverride(token: Token) {
		if (isSet(token) && isBy(this.previousReservedToken)) {
			return { type: tokenTypes.RESERVED, value: token.value };
		}

		if (isLateral(token)) {
			if (this.tokenLookAhead()?.type === tokenTypes.OPEN_PAREN) {
				// This is a subquery, treat it like a join
				return { type: tokenTypes.RESERVED_NEWLINE, value: token.value };
			}
		}

		return token;
	}
}
