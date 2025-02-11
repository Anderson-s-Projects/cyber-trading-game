export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          conditions: Json | null
          created_at: string
          description: string
          id: string
          name: string
          reward_xp: number | null
        }
        Insert: {
          conditions?: Json | null
          created_at?: string
          description: string
          id?: string
          name: string
          reward_xp?: number | null
        }
        Update: {
          conditions?: Json | null
          created_at?: string
          description?: string
          id?: string
          name?: string
          reward_xp?: number | null
        }
        Relationships: []
      }
      career_achievements: {
        Row: {
          created_at: string
          description: string
          id: string
          name: string
          reputation_requirement: number | null
          required_level: Database["public"]["Enums"]["career_level"] | null
          required_path: Database["public"]["Enums"]["career_path"] | null
          reward_reputation: number
          reward_xp: number
          technical_skill_requirement: number | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          name: string
          reputation_requirement?: number | null
          required_level?: Database["public"]["Enums"]["career_level"] | null
          required_path?: Database["public"]["Enums"]["career_path"] | null
          reward_reputation?: number
          reward_xp?: number
          technical_skill_requirement?: number | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          name?: string
          reputation_requirement?: number | null
          required_level?: Database["public"]["Enums"]["career_level"] | null
          required_path?: Database["public"]["Enums"]["career_path"] | null
          reward_reputation?: number
          reward_xp?: number
          technical_skill_requirement?: number | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          parent_message_id: string | null
          project_id: string | null
          sender_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          parent_message_id?: string | null
          project_id?: string | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          parent_message_id?: string | null
          project_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_parent_message_id_fkey"
            columns: ["parent_message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      collaborators: {
        Row: {
          id: string
          last_seen: string | null
          status: string | null
          user_id: string
          username: string
        }
        Insert: {
          id?: string
          last_seen?: string | null
          status?: string | null
          user_id: string
          username: string
        }
        Update: {
          id?: string
          last_seen?: string | null
          status?: string | null
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      file_permissions: {
        Row: {
          created_at: string | null
          created_by: string | null
          file_id: string | null
          id: string
          permission_level: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          file_id?: string | null
          id?: string
          permission_level?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          file_id?: string | null
          id?: string
          permission_level?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "file_permissions_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
        ]
      }
      file_versions: {
        Row: {
          arweave_txid: string | null
          file_id: string | null
          id: string
          ipfs_cid: string | null
          parent_version_id: string | null
          updated_at: string | null
          updated_by: string | null
          version_number: number | null
        }
        Insert: {
          arweave_txid?: string | null
          file_id?: string | null
          id?: string
          ipfs_cid?: string | null
          parent_version_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          version_number?: number | null
        }
        Update: {
          arweave_txid?: string | null
          file_id?: string | null
          id?: string
          ipfs_cid?: string | null
          parent_version_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          version_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "file_versions_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "file_versions_parent_version_id_fkey"
            columns: ["parent_version_id"]
            isOneToOne: false
            referencedRelation: "file_versions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "file_versions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      files: {
        Row: {
          arweave_txid: string | null
          content_hash: string | null
          file_name: string
          id: string
          ipfs_cid: string | null
          mime_type: string | null
          project_id: string | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          arweave_txid?: string | null
          content_hash?: string | null
          file_name: string
          id?: string
          ipfs_cid?: string | null
          mime_type?: string | null
          project_id?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          arweave_txid?: string | null
          content_hash?: string | null
          file_name?: string
          id?: string
          ipfs_cid?: string | null
          mime_type?: string | null
          project_id?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      market_data: {
        Row: {
          id: string
          price: number
          stock_id: string | null
          timestamp: string | null
          volume: number
        }
        Insert: {
          id?: string
          price: number
          stock_id?: string | null
          timestamp?: string | null
          volume: number
        }
        Update: {
          id?: string
          price?: number
          stock_id?: string | null
          timestamp?: string | null
          volume?: number
        }
        Relationships: [
          {
            foreignKeyName: "market_data_stock_id_fkey"
            columns: ["stock_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["id"]
          },
        ]
      }
      nft_attributes: {
        Row: {
          attribute_key: string
          attribute_value: string | null
          nft_id: string
        }
        Insert: {
          attribute_key: string
          attribute_value?: string | null
          nft_id: string
        }
        Update: {
          attribute_key?: string
          attribute_value?: string | null
          nft_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nft_attributes_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["id"]
          },
        ]
      }
      nfts: {
        Row: {
          contract_address: string | null
          id: string
          minted_at: string | null
          owner_id: string | null
          token_id: string | null
          token_standard: string | null
          token_uri: string | null
        }
        Insert: {
          contract_address?: string | null
          id?: string
          minted_at?: string | null
          owner_id?: string | null
          token_id?: string | null
          token_standard?: string | null
          token_uri?: string | null
        }
        Update: {
          contract_address?: string | null
          id?: string
          minted_at?: string | null
          owner_id?: string | null
          token_id?: string | null
          token_standard?: string | null
          token_uri?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nfts_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nfts_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          id: string
          message: string | null
          read: boolean | null
          related_id: string | null
          sent_at: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          message?: string | null
          read?: boolean | null
          related_id?: string | null
          sent_at?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          message?: string | null
          read?: boolean | null
          related_id?: string | null
          sent_at?: string | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      project_members: {
        Row: {
          project_id: string
          role: string | null
          user_id: string
        }
        Insert: {
          project_id: string
          role?: string | null
          user_id: string
        }
        Update: {
          project_id?: string
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_members_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          chain_id: number | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          chain_id?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          chain_id?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      proposals: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          end_date: string | null
          id: string
          start_date: string | null
          title: string
          voting_period: number | null
          winning_option: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          title: string
          voting_period?: number | null
          winning_option?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          title?: string
          voting_period?: number | null
          winning_option?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proposals_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_transactions: {
        Row: {
          id: string
          portfolio_id: string | null
          price_per_share: number
          quantity: number
          symbol: string
          total_amount: number | null
          transaction_date: string | null
          transaction_type: string
        }
        Insert: {
          id?: string
          portfolio_id?: string | null
          price_per_share: number
          quantity: number
          symbol: string
          total_amount?: number | null
          transaction_date?: string | null
          transaction_type: string
        }
        Update: {
          id?: string
          portfolio_id?: string | null
          price_per_share?: number
          quantity?: number
          symbol?: string
          total_amount?: number | null
          transaction_date?: string | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "stock_transactions_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "user_portfolios"
            referencedColumns: ["id"]
          },
        ]
      }
      stocks: {
        Row: {
          company_name: string
          created_at: string | null
          id: string
          market: Database["public"]["Enums"]["stock_market"]
          sector: Database["public"]["Enums"]["stock_sector"]
          symbol: string
          updated_at: string | null
        }
        Insert: {
          company_name: string
          created_at?: string | null
          id?: string
          market: Database["public"]["Enums"]["stock_market"]
          sector: Database["public"]["Enums"]["stock_sector"]
          symbol: string
          updated_at?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string | null
          id?: string
          market?: Database["public"]["Enums"]["stock_market"]
          sector?: Database["public"]["Enums"]["stock_sector"]
          symbol?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      task_nft_rewards: {
        Row: {
          nft_id: string
          task_id: string
        }
        Insert: {
          nft_id: string
          task_id: string
        }
        Update: {
          nft_id?: string
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_nft_rewards_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_nft_rewards_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          bounty: number | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          project_id: string | null
          status: string | null
          status_updated_at: string | null
          title: string
        }
        Insert: {
          assigned_to?: string | null
          bounty?: number | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          project_id?: string | null
          status?: string | null
          status_updated_at?: string | null
          title: string
        }
        Update: {
          assigned_to?: string | null
          bounty?: number | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          project_id?: string | null
          status?: string | null
          status_updated_at?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      tokens: {
        Row: {
          chain_id: number | null
          contract_address: string | null
          id: string
          name: string
          symbol: string
        }
        Insert: {
          chain_id?: number | null
          contract_address?: string | null
          id?: string
          name: string
          symbol: string
        }
        Update: {
          chain_id?: number | null
          contract_address?: string | null
          id?: string
          name?: string
          symbol?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achieved_at: string
          achievement_id: string
          user_id: string
        }
        Insert: {
          achieved_at?: string
          achievement_id: string
          user_id: string
        }
        Update: {
          achieved_at?: string
          achievement_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_career_achievements: {
        Row: {
          achieved_at: string
          achievement_id: string
          user_id: string
        }
        Insert: {
          achieved_at?: string
          achievement_id: string
          user_id: string
        }
        Update: {
          achieved_at?: string
          achievement_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_career_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "career_achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_careers: {
        Row: {
          created_at: string
          current_level: Database["public"]["Enums"]["career_level"]
          current_path: Database["public"]["Enums"]["career_path"]
          heat_level: number
          id: string
          network_size: number
          reputation_score: number
          technical_skills: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          current_level?: Database["public"]["Enums"]["career_level"]
          current_path?: Database["public"]["Enums"]["career_path"]
          heat_level?: number
          id?: string
          network_size?: number
          reputation_score?: number
          technical_skills?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          current_level?: Database["public"]["Enums"]["career_level"]
          current_path?: Database["public"]["Enums"]["career_path"]
          heat_level?: number
          id?: string
          network_size?: number
          reputation_score?: number
          technical_skills?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_nfts: {
        Row: {
          nft_id: string
          user_id: string
        }
        Insert: {
          nft_id: string
          user_id: string
        }
        Update: {
          nft_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_nfts_nft_id_fkey"
            columns: ["nft_id"]
            isOneToOne: false
            referencedRelation: "nfts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_nfts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_portfolios: {
        Row: {
          cash_balance: number | null
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cash_balance?: number | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cash_balance?: number | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          achievements: Json | null
          avatar_url: string | null
          created_at: string
          experience_points: number | null
          id: string
          level: number | null
          updated_at: string
          username: string | null
        }
        Insert: {
          achievements?: Json | null
          avatar_url?: string | null
          created_at?: string
          experience_points?: number | null
          id: string
          level?: number | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          achievements?: Json | null
          avatar_url?: string | null
          created_at?: string
          experience_points?: number | null
          id?: string
          level?: number | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      user_tokens: {
        Row: {
          balance: number | null
          stake_lock_end: string | null
          token_id: string
          user_id: string
        }
        Insert: {
          balance?: number | null
          stake_lock_end?: string | null
          token_id: string
          user_id: string
        }
        Update: {
          balance?: number | null
          stake_lock_end?: string | null
          token_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_tokens_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "tokens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_wallets: {
        Row: {
          user_id: string
          wallet_address: string
        }
        Insert: {
          user_id: string
          wallet_address: string
        }
        Update: {
          user_id?: string
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_wallets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          bio: string | null
          created_at: string | null
          did: string | null
          email: string | null
          id: string
          profile_picture: string | null
          username: string | null
          wallet_address: string
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          did?: string | null
          email?: string | null
          id?: string
          profile_picture?: string | null
          username?: string | null
          wallet_address: string
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          did?: string | null
          email?: string | null
          id?: string
          profile_picture?: string | null
          username?: string | null
          wallet_address?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          proposal_id: string
          reason: string | null
          user_id: string
          vote: boolean | null
          voted_at: string | null
        }
        Insert: {
          proposal_id: string
          reason?: string | null
          user_id: string
          vote?: boolean | null
          voted_at?: string | null
        }
        Update: {
          proposal_id?: string
          reason?: string | null
          user_id?: string
          vote?: boolean | null
          voted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "votes_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      whiteboards: {
        Row: {
          data: Json | null
          id: string
          project_id: string | null
          updated_at: string | null
        }
        Insert: {
          data?: Json | null
          id?: string
          project_id?: string | null
          updated_at?: string | null
        }
        Update: {
          data?: Json | null
          id?: string
          project_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whiteboards_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      portfolio_holdings: {
        Row: {
          portfolio_id: string | null
          symbol: string | null
          total_invested: number | null
          total_shares: number | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_transactions_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "user_portfolios"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      career_level:
        | "retail_trader"
        | "professional_trader"
        | "fund_manager"
        | "investment_bank_owner"
        | "market_maker"
        | "street_hustler"
        | "market_manipulator"
        | "inside_trader"
        | "crime_syndicate_leader"
        | "market_kingpin"
      career_path: "legitimate" | "criminal"
      stock_market: "NYSE" | "NASDAQ" | "CRYPTO" | "DARKNET"
      stock_sector:
        | "TECHNOLOGY"
        | "HEALTHCARE"
        | "FINANCE"
        | "ENERGY"
        | "CONSUMER"
        | "INDUSTRIAL"
        | "CRYPTO"
        | "DARKNET"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
