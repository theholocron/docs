export interface CapabilitiesRow {
	capability: string;
	token: string;
}

export interface CapabilitiesTableProps {
	rows: CapabilitiesRow[];
}
