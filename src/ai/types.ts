/**
 * Portfolio Assistant Type Definitions
 */

export interface AssistantResponse {
  text: string;
  targetSlug?: string | null;
  confidence: number;
  matchedCategory?: string;
}

export interface IntentPattern {
  category: string;
  targetSlug: string;
  keywords: string[];
  patterns: RegExp[];
  handler: (query: string, entities: string[]) => string;
}

export interface KnowledgeEntity {
  id: string;
  name: string;
  category: string;
  summary: string;
  details: string;
  technologies?: string[];
  targetSlug: string;
  url?: string;
}

export interface IntentDefinition {
  id: string;
  category: string;
  targetSlug: string;
  aliases: string[];
  patterns: RegExp[];
  priority?: number;
}

