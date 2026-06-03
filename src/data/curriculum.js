export const curriculum = {
  mentalModel: [
    "Reality",
    "Data",
    "Database",
    "SQL",
    "Insight",
    "Decision",
    "Business impact"
  ],
  levels: [
    { id: 1, name: "Data Explorer", xp: 0 },
    { id: 2, name: "Data Detective", xp: 350 },
    { id: 3, name: "Query Builder", xp: 700 },
    { id: 4, name: "Data Analyst", xp: 1100 },
    { id: 5, name: "BI Apprentice", xp: 1550 },
    { id: 6, name: "SQL Strategist", xp: 2050 },
    { id: 7, name: "Analytics Architect", xp: 2600 },
    { id: 8, name: "Data Commander", xp: 3200 },
    { id: 9, name: "Infinity Master", xp: 3900 }
  ],
  badges: [
    { id: "first-win", name: "First Visible Win", text: "Complete one lesson." },
    { id: "attempt-first", name: "Attempt Before Answer", text: "Check a query before opening a solution." },
    { id: "reviewer", name: "Retention Starter", text: "Complete one daily review." },
    { id: "week-one", name: "Week Finisher", text: "Complete every lesson in a week." },
    { id: "boss-clear", name: "Boss Battle Clear", text: "Complete a monthly battle." },
    { id: "halfway", name: "Halfway Analyst", text: "Complete twelve weeks." },
    { id: "infinity", name: "Infinity Master", text: "Complete all twenty-four weeks." }
  ],
  bossBattles: [
    {
      month: 1,
      title: "Retail Recovery",
      prompt: "A retail chain wants to know which products are losing momentum and which customer groups still buy consistently."
    },
    {
      month: 2,
      title: "Campus Performance",
      prompt: "A college wants attendance, test, and placement data translated into early academic risk signals."
    },
    {
      month: 3,
      title: "Subscription Growth",
      prompt: "A SaaS team needs to separate healthy recurring revenue from churn risk and weak onboarding."
    },
    {
      month: 4,
      title: "Marketplace Quality",
      prompt: "An online marketplace wants to identify sellers, categories, and service gaps that hurt repeat orders."
    },
    {
      month: 5,
      title: "Banking Portfolio",
      prompt: "A bank needs to spot profitable segments while keeping credit risk and late payments visible."
    },
    {
      month: 6,
      title: "Executive Analytics",
      prompt: "A leadership team wants a final SQL story that connects data quality, metrics, decisions, and business impact."
    }
  ],
  weeks: [
    {
      id: 1,
      phase: "Weeks 1-2: Data Thinking",
      title: "From Reality To Data",
      level: "Data Explorer",
      story: "A store owner sees crowded aisles, empty shelves, and late orders. The learner turns those observations into data questions.",
      visibleWin: "Explain one business situation as entities, events, and measures.",
      lessons: ["Spot business events", "Separate entities from measures", "Write a decision question"],
      review: ["What is the real-world event?", "What entity owns the data?", "What decision could this data improve?"],
      challenge: {
        company: "CornerMart",
        prompt: "List recent customer orders so the store manager can begin studying demand.",
        schema: ["customers(id, name, segment)", "orders(id, customer_id, order_date, total_amount)"],
        starter: "select ...",
        checks: [
          { label: "Selects columns", pattern: "\\bselect\\b" },
          { label: "Uses orders table", pattern: "\\bfrom\\s+orders\\b" },
          { label: "Shows order date", pattern: "order_date" }
        ],
        solution: "select id, customer_id, order_date, total_amount\nfrom orders\norder by order_date desc;"
      }
    },
    {
      id: 2,
      phase: "Weeks 1-2: Data Thinking",
      title: "Database Intuition",
      level: "Data Explorer",
      story: "A college office wants to understand how students, courses, and attendance connect before writing SQL.",
      visibleWin: "Draw a table relationship in words before querying.",
      lessons: ["Read table names as business nouns", "Find keys", "Connect tables with relationships"],
      review: ["Which column identifies a record?", "Why do relationships matter?", "What can go wrong with duplicate data?"],
      challenge: {
        company: "Northstar College",
        prompt: "Show attendance records with the student identifier and class date.",
        schema: ["students(id, name, program)", "attendance(id, student_id, class_date, status)"],
        starter: "select ...",
        checks: [
          { label: "Reads attendance", pattern: "\\bfrom\\s+attendance\\b" },
          { label: "Includes student id", pattern: "student_id" },
          { label: "Includes status", pattern: "status" }
        ],
        solution: "select student_id, class_date, status\nfrom attendance\norder by class_date desc;"
      }
    },
    {
      id: 3,
      phase: "Weeks 3-4: SQL Foundations",
      title: "SELECT And FROM",
      level: "Data Detective",
      story: "A sales lead needs a clean customer list before any analysis can begin.",
      visibleWin: "Write a query that returns only useful columns.",
      lessons: ["Use SELECT", "Choose a source table", "Alias readable columns"],
      review: ["What does SELECT control?", "What does FROM control?", "Why avoid selecting everything?"],
      challenge: {
        company: "BrightCart",
        prompt: "Return customer names, city, and signup date for a customer review.",
        schema: ["customers(id, full_name, city, signup_date, segment)"],
        starter: "select full_name, city, signup_date\nfrom customers;",
        checks: [
          { label: "Uses SELECT", pattern: "\\bselect\\b" },
          { label: "Uses customers", pattern: "\\bfrom\\s+customers\\b" },
          { label: "Includes signup date", pattern: "signup_date" }
        ],
        solution: "select full_name, city, signup_date\nfrom customers;"
      }
    },
    {
      id: 4,
      phase: "Weeks 3-4: SQL Foundations",
      title: "Filtering Decisions",
      level: "Data Detective",
      story: "A manager wants only late shipments, not a giant report of every shipment.",
      visibleWin: "Use WHERE to focus a business question.",
      lessons: ["Use WHERE", "Compare numbers and dates", "Combine conditions"],
      review: ["What does filtering remove?", "When should a date condition be used?", "How can a filter bias the result?"],
      challenge: {
        company: "ShipSwift",
        prompt: "Find shipments that arrived late and cost more than 500.",
        schema: ["shipments(id, shipped_date, delivered_date, delivery_status, shipping_cost)"],
        starter: "select ...\nfrom shipments\nwhere ...;",
        checks: [
          { label: "Uses WHERE", pattern: "\\bwhere\\b" },
          { label: "Filters late status", pattern: "delivery_status\\s*=\\s*['\"]?late" },
          { label: "Filters high cost", pattern: "shipping_cost\\s*>\\s*500" }
        ],
        solution: "select id, delivered_date, shipping_cost\nfrom shipments\nwhere delivery_status = 'late'\n  and shipping_cost > 500;"
      }
    },
    {
      id: 5,
      phase: "Weeks 5-8: Intermediate SQL",
      title: "Sorting And Limiting",
      level: "Query Builder",
      story: "A founder wants the top customers first because attention is limited.",
      visibleWin: "Rank a table for a practical business priority.",
      lessons: ["Use ORDER BY", "Use LIMIT", "Sort ascending and descending"],
      review: ["What does ranking change?", "When is LIMIT useful?", "What happens when ties exist?"],
      challenge: {
        company: "FreshNest",
        prompt: "Show the ten largest orders by order value.",
        schema: ["orders(id, customer_id, order_date, total_amount)"],
        starter: "select ...",
        checks: [
          { label: "Orders by amount", pattern: "order\\s+by\\s+total_amount" },
          { label: "Uses descending rank", pattern: "\\bdesc\\b" },
          { label: "Limits result", pattern: "\\blimit\\s+10\\b" }
        ],
        solution: "select id, customer_id, order_date, total_amount\nfrom orders\norder by total_amount desc\nlimit 10;"
      }
    },
    {
      id: 6,
      phase: "Weeks 5-8: Intermediate SQL",
      title: "Grouping For Meaning",
      level: "Query Builder",
      story: "A category manager stops reading individual orders and starts comparing category performance.",
      visibleWin: "Turn rows into a summary metric.",
      lessons: ["Use COUNT", "Use SUM and AVG", "Group by business categories"],
      review: ["What question needs aggregation?", "Which columns belong in GROUP BY?", "What does an average hide?"],
      challenge: {
        company: "MarketLane",
        prompt: "Calculate total revenue by product category.",
        schema: ["products(id, category, product_name)", "order_items(id, product_id, quantity, line_revenue)"],
        starter: "select ...\nfrom ...\ngroup by ...;",
        checks: [
          { label: "Uses SUM", pattern: "\\bsum\\s*\\(" },
          { label: "Groups by category", pattern: "group\\s+by\\s+.*category" },
          { label: "Uses product table", pattern: "\\bproducts\\b" }
        ],
        solution: "select p.category, sum(oi.line_revenue) as total_revenue\nfrom order_items oi\njoin products p on p.id = oi.product_id\ngroup by p.category\norder by total_revenue desc;"
      }
    },
    {
      id: 7,
      phase: "Weeks 5-8: Intermediate SQL",
      title: "Joining Business Worlds",
      level: "Query Builder",
      story: "Customer records and order records become useful only when the learner connects them.",
      visibleWin: "Join two tables to answer a cross-table question.",
      lessons: ["Use INNER JOIN", "Join with keys", "Choose table aliases"],
      review: ["What key connects the tables?", "What rows disappear in an inner join?", "Why do aliases help?"],
      challenge: {
        company: "UrbanBasket",
        prompt: "Show each order with the customer name and customer segment.",
        schema: ["customers(id, full_name, segment)", "orders(id, customer_id, order_date, total_amount)"],
        starter: "select ...\nfrom orders o\njoin customers c on ...;",
        checks: [
          { label: "Uses JOIN", pattern: "\\bjoin\\b" },
          { label: "Connects customer key", pattern: "customer_id\\s*=\\s*.*id|id\\s*=\\s*.*customer_id" },
          { label: "Includes segment", pattern: "segment" }
        ],
        solution: "select o.id, c.full_name, c.segment, o.order_date, o.total_amount\nfrom orders o\njoin customers c on c.id = o.customer_id;"
      }
    },
    {
      id: 8,
      phase: "Weeks 5-8: Intermediate SQL",
      title: "HAVING And Segment Focus",
      level: "Data Analyst",
      story: "The marketing team wants segments with enough value to justify a campaign.",
      visibleWin: "Filter grouped results with HAVING.",
      lessons: ["Use HAVING", "Filter aggregate values", "Compare segments"],
      review: ["Why not use WHERE for aggregate filters?", "What makes a segment meaningful?", "What threshold fits the decision?"],
      challenge: {
        company: "FitPulse",
        prompt: "Find customer segments with more than 100000 in total revenue.",
        schema: ["customers(id, segment)", "orders(id, customer_id, total_amount)"],
        starter: "select segment, sum(...)\nfrom ...\ngroup by segment\nhaving ...;",
        checks: [
          { label: "Groups by segment", pattern: "group\\s+by\\s+.*segment" },
          { label: "Uses HAVING", pattern: "\\bhaving\\b" },
          { label: "Uses revenue threshold", pattern: "100000" }
        ],
        solution: "select c.segment, sum(o.total_amount) as revenue\nfrom orders o\njoin customers c on c.id = o.customer_id\ngroup by c.segment\nhaving sum(o.total_amount) > 100000;"
      }
    },
    {
      id: 9,
      phase: "Weeks 9-12: Advanced SQL",
      title: "Subqueries",
      level: "Data Analyst",
      story: "A finance analyst compares every order against the overall order benchmark.",
      visibleWin: "Use one query to create a benchmark for another.",
      lessons: ["Write scalar subqueries", "Use IN subqueries", "Compare against averages"],
      review: ["What does the inner query return?", "Can it return one value or many?", "How does the outer query use it?"],
      challenge: {
        company: "Ledgerly",
        prompt: "Find orders above the average order value.",
        schema: ["orders(id, customer_id, total_amount, order_date)"],
        starter: "select ...\nfrom orders\nwhere total_amount > (...);",
        checks: [
          { label: "Uses a subquery", pattern: "\\(\\s*select" },
          { label: "Calculates average", pattern: "avg\\s*\\(\\s*total_amount\\s*\\)" },
          { label: "Compares amount", pattern: "total_amount\\s*>" }
        ],
        solution: "select id, customer_id, total_amount\nfrom orders\nwhere total_amount > (\n  select avg(total_amount)\n  from orders\n);"
      }
    },
    {
      id: 10,
      phase: "Weeks 9-12: Advanced SQL",
      title: "CASE Logic",
      level: "Data Analyst",
      story: "A support team turns raw response times into clear service bands.",
      visibleWin: "Create a business label inside a query.",
      lessons: ["Use CASE", "Create categories", "Translate metrics into labels"],
      review: ["What label helps the business?", "What order should conditions follow?", "What is the ELSE case?"],
      challenge: {
        company: "HelpHive",
        prompt: "Classify tickets as fast, normal, or delayed based on response minutes.",
        schema: ["tickets(id, customer_id, response_minutes, resolved_at)"],
        starter: "select id,\ncase ... end as response_band\nfrom tickets;",
        checks: [
          { label: "Uses CASE", pattern: "\\bcase\\b" },
          { label: "Checks response minutes", pattern: "response_minutes" },
          { label: "Creates alias", pattern: "as\\s+response_band" }
        ],
        solution: "select id,\n  case\n    when response_minutes <= 30 then 'fast'\n    when response_minutes <= 120 then 'normal'\n    else 'delayed'\n  end as response_band\nfrom tickets;"
      }
    },
    {
      id: 11,
      phase: "Weeks 9-12: Advanced SQL",
      title: "Window Functions",
      level: "BI Apprentice",
      story: "A revenue team needs ranks without collapsing the detail rows.",
      visibleWin: "Rank records while keeping row-level context.",
      lessons: ["Use OVER", "Partition data", "Rank rows"],
      review: ["How is a window different from GROUP BY?", "What does partitioning reset?", "Which rank function fits the decision?"],
      challenge: {
        company: "RevenueWorks",
        prompt: "Rank customers by spend within each region.",
        schema: ["customers(id, full_name, region)", "orders(id, customer_id, total_amount)"],
        starter: "select ... rank() over (...) ...",
        checks: [
          { label: "Uses window OVER", pattern: "\\bover\\s*\\(" },
          { label: "Partitions by region", pattern: "partition\\s+by\\s+.*region" },
          { label: "Orders by spend", pattern: "order\\s+by\\s+.*sum|order\\s+by\\s+.*total" }
        ],
        solution: "select c.region, c.full_name, sum(o.total_amount) as spend,\n  rank() over (partition by c.region order by sum(o.total_amount) desc) as region_rank\nfrom customers c\njoin orders o on o.customer_id = c.id\ngroup by c.region, c.full_name;"
      }
    },
    {
      id: 12,
      phase: "Weeks 9-12: Advanced SQL",
      title: "Common Table Expressions",
      level: "BI Apprentice",
      story: "A complex retention query becomes easier when the learner names each thinking step.",
      visibleWin: "Break a business question into readable SQL blocks.",
      lessons: ["Use WITH", "Name intermediate results", "Chain analysis steps"],
      review: ["What does the CTE represent?", "Can the step be tested alone?", "Does the final query read like the business question?"],
      challenge: {
        company: "StreamBox",
        prompt: "Create a CTE for monthly active users and return months with more than 1000 active users.",
        schema: ["events(id, user_id, event_date, event_name)"],
        starter: "with monthly_active as (...)",
        checks: [
          { label: "Uses WITH", pattern: "^\\s*with\\b" },
          { label: "Counts users", pattern: "count\\s*\\(\\s*distinct\\s+user_id\\s*\\)" },
          { label: "Filters active months", pattern: "active_users\\s*>\\s*1000|having\\s+.*1000" }
        ],
        solution: "with monthly_active as (\n  select date_trunc('month', event_date) as month,\n    count(distinct user_id) as active_users\n  from events\n  group by date_trunc('month', event_date)\n)\nselect month, active_users\nfrom monthly_active\nwhere active_users > 1000;"
      }
    },
    {
      id: 13,
      phase: "Weeks 13-16: Business Analytics SQL",
      title: "Metric Design",
      level: "SQL Strategist",
      story: "A team stops arguing about numbers by defining the metric before querying.",
      visibleWin: "Write SQL that matches a metric definition.",
      lessons: ["Define numerator and denominator", "Choose grain", "Name a metric clearly"],
      review: ["What exactly is counted?", "What is excluded?", "Who uses the metric?"],
      challenge: {
        company: "LearnLoop",
        prompt: "Calculate course completion rate from enrollments and completions.",
        schema: ["enrollments(id, learner_id, course_id)", "course_completions(id, learner_id, course_id, completed_at)"],
        starter: "select ...",
        checks: [
          { label: "Counts completions", pattern: "count\\s*\\(.*completed|count\\s*\\(.*course_completions" },
          { label: "Uses denominator", pattern: "count\\s*\\(.*enroll" },
          { label: "Creates rate", pattern: "\\/|rate" }
        ],
        solution: "select\n  count(distinct cc.id) * 1.0 / count(distinct e.id) as completion_rate\nfrom enrollments e\nleft join course_completions cc\n  on cc.learner_id = e.learner_id\n and cc.course_id = e.course_id;"
      }
    },
    {
      id: 14,
      phase: "Weeks 13-16: Business Analytics SQL",
      title: "Cohort Thinking",
      level: "SQL Strategist",
      story: "A product manager learns whether newer customers behave better than older customers.",
      visibleWin: "Compare users by signup cohort.",
      lessons: ["Define cohorts", "Join activity to cohorts", "Read retention patterns"],
      review: ["What starts the cohort?", "What behavior proves return?", "Which time window matters?"],
      challenge: {
        company: "AppForge",
        prompt: "Group users by signup month and count active users by activity month.",
        schema: ["users(id, signup_date)", "events(id, user_id, event_date)"],
        starter: "select ... date_trunc('month', ...) ...",
        checks: [
          { label: "Creates signup month", pattern: "signup_date" },
          { label: "Creates activity month", pattern: "event_date" },
          { label: "Counts active users", pattern: "count\\s*\\(\\s*distinct\\s+.*user_id" }
        ],
        solution: "select date_trunc('month', u.signup_date) as signup_month,\n  date_trunc('month', e.event_date) as activity_month,\n  count(distinct u.id) as active_users\nfrom users u\njoin events e on e.user_id = u.id\ngroup by 1, 2\norder by 1, 2;"
      }
    },
    {
      id: 15,
      phase: "Weeks 13-16: Business Analytics SQL",
      title: "Funnels",
      level: "SQL Strategist",
      story: "A growth team needs to see where buyers drop between signup, trial, purchase, and renewal.",
      visibleWin: "Measure each funnel step in one result.",
      lessons: ["Model funnel steps", "Use conditional aggregation", "Translate drop-off"],
      review: ["What is the sequence?", "Which events count once?", "Where is the biggest drop?"],
      challenge: {
        company: "TrialPilot",
        prompt: "Count users who signed up, started trial, and purchased.",
        schema: ["events(id, user_id, event_name, event_date)"],
        starter: "select count(distinct case when ...)",
        checks: [
          { label: "Uses CASE", pattern: "\\bcase\\b" },
          { label: "Counts distinct users", pattern: "count\\s*\\(\\s*distinct" },
          { label: "Includes funnel events", pattern: "signup|trial|purchase" }
        ],
        solution: "select\n  count(distinct case when event_name = 'signup' then user_id end) as signups,\n  count(distinct case when event_name = 'trial_started' then user_id end) as trials,\n  count(distinct case when event_name = 'purchase' then user_id end) as purchases\nfrom events;"
      }
    },
    {
      id: 16,
      phase: "Weeks 13-16: Business Analytics SQL",
      title: "Executive Story Queries",
      level: "Analytics Architect",
      story: "The learner turns query output into a clear recommendation for leadership.",
      visibleWin: "Attach a decision sentence to a SQL result.",
      lessons: ["Select decision-ready metrics", "Compare periods", "Write business translation"],
      review: ["What decision follows?", "What caveat belongs with the result?", "Who needs the answer?"],
      challenge: {
        company: "BoardRoom Analytics",
        prompt: "Compare this month's revenue with last month's revenue.",
        schema: ["orders(id, order_date, total_amount)"],
        starter: "select ...",
        checks: [
          { label: "Uses date logic", pattern: "date_trunc|month|interval" },
          { label: "Sums revenue", pattern: "sum\\s*\\(\\s*total_amount\\s*\\)" },
          { label: "Groups by period", pattern: "group\\s+by" }
        ],
        solution: "select date_trunc('month', order_date) as revenue_month,\n  sum(total_amount) as revenue\nfrom orders\nwhere order_date >= date_trunc('month', current_date) - interval '1 month'\ngroup by date_trunc('month', order_date)\norder by revenue_month;"
      }
    },
    {
      id: 17,
      phase: "Weeks 17-24: Real-World Mastery Projects",
      title: "Retail Analytics Project",
      level: "Analytics Architect",
      story: "The learner diagnoses product, customer, and channel performance for a retail operator.",
      visibleWin: "Build a retail performance query set.",
      lessons: ["Define retail KPIs", "Analyze baskets", "Segment store performance"],
      review: ["Which KPI matters first?", "What segment explains the issue?", "What action follows?"],
      challenge: {
        company: "RetailOS",
        prompt: "Find the top five product categories by revenue and average order value.",
        schema: ["orders(id, customer_id, total_amount)", "order_items(id, order_id, product_id, line_revenue)", "products(id, category)"],
        starter: "select p.category, ...",
        checks: [
          { label: "Joins product data", pattern: "\\bjoin\\s+products\\b|\\bproducts\\s+p\\b" },
          { label: "Sums revenue", pattern: "sum\\s*\\(" },
          { label: "Limits top five", pattern: "limit\\s+5" }
        ],
        solution: "select p.category,\n  sum(oi.line_revenue) as revenue,\n  avg(o.total_amount) as avg_order_value\nfrom order_items oi\njoin products p on p.id = oi.product_id\njoin orders o on o.id = oi.order_id\ngroup by p.category\norder by revenue desc\nlimit 5;"
      }
    },
    {
      id: 18,
      phase: "Weeks 17-24: Real-World Mastery Projects",
      title: "HR Analytics Project",
      level: "Analytics Architect",
      story: "An HR team wants attrition patterns without turning people into raw numbers.",
      visibleWin: "Analyze attrition while preserving context.",
      lessons: ["Build employee cohorts", "Compare departments", "Read risk indicators"],
      review: ["What is the ethical boundary?", "Which group comparison is fair?", "What action helps people?"],
      challenge: {
        company: "PeopleGrid",
        prompt: "Calculate attrition rate by department.",
        schema: ["employees(id, department, hire_date, exit_date)"],
        starter: "select department, ...",
        checks: [
          { label: "Groups by department", pattern: "group\\s+by\\s+.*department" },
          { label: "Counts exits", pattern: "exit_date" },
          { label: "Calculates rate", pattern: "\\/|rate" }
        ],
        solution: "select department,\n  count(case when exit_date is not null then 1 end) * 1.0 / count(*) as attrition_rate\nfrom employees\ngroup by department\norder by attrition_rate desc;"
      }
    },
    {
      id: 19,
      phase: "Weeks 17-24: Real-World Mastery Projects",
      title: "Finance Analytics Project",
      level: "Data Commander",
      story: "A finance team wants margin and cash signals that guide operating decisions.",
      visibleWin: "Connect revenue, cost, and margin in one query.",
      lessons: ["Calculate margin", "Compare periods", "Spot risky accounts"],
      review: ["What cost belongs with the revenue?", "What margin is acceptable?", "What decision changes?"],
      challenge: {
        company: "FinSight",
        prompt: "Show monthly gross margin percentage.",
        schema: ["transactions(id, transaction_date, revenue, cost)"],
        starter: "select ...",
        checks: [
          { label: "Uses revenue and cost", pattern: "revenue" },
          { label: "Calculates margin", pattern: "revenue\\s*-\\s*cost|cost\\s*-" },
          { label: "Groups by month", pattern: "date_trunc|month" }
        ],
        solution: "select date_trunc('month', transaction_date) as month,\n  sum(revenue - cost) * 1.0 / nullif(sum(revenue), 0) as gross_margin_pct\nfrom transactions\ngroup by date_trunc('month', transaction_date)\norder by month;"
      }
    },
    {
      id: 20,
      phase: "Weeks 17-24: Real-World Mastery Projects",
      title: "Marketing Analytics Project",
      level: "Data Commander",
      story: "A marketing team needs channel performance that connects spend to customer outcomes.",
      visibleWin: "Compare channels with conversion and cost metrics.",
      lessons: ["Measure acquisition", "Calculate CPA", "Read campaign quality"],
      review: ["Which channel creates value?", "What cost is too high?", "What should be tested next?"],
      challenge: {
        company: "CampaignLab",
        prompt: "Calculate conversions and cost per conversion by channel.",
        schema: ["campaigns(id, channel, spend)", "conversions(id, campaign_id, customer_id)"],
        starter: "select channel, ...",
        checks: [
          { label: "Joins conversions", pattern: "\\bjoin\\s+conversions\\b|\\bconversions\\b" },
          { label: "Counts conversions", pattern: "count\\s*\\(" },
          { label: "Calculates cost per conversion", pattern: "spend\\s*\\/|\\/" }
        ],
        solution: "select c.channel,\n  count(v.id) as conversions,\n  sum(c.spend) * 1.0 / nullif(count(v.id), 0) as cost_per_conversion\nfrom campaigns c\nleft join conversions v on v.campaign_id = c.id\ngroup by c.channel\norder by cost_per_conversion;"
      }
    },
    {
      id: 21,
      phase: "Weeks 17-24: Real-World Mastery Projects",
      title: "Product Analytics Project",
      level: "Data Commander",
      story: "A product team studies feature behavior instead of relying on opinions.",
      visibleWin: "Measure feature adoption and repeat usage.",
      lessons: ["Define adoption", "Measure repeat behavior", "Compare user segments"],
      review: ["What behavior proves adoption?", "What time window fits?", "What feature needs intervention?"],
      challenge: {
        company: "FeatureWorks",
        prompt: "Find feature adoption count by user segment.",
        schema: ["users(id, segment)", "feature_events(id, user_id, feature_name, event_date)"],
        starter: "select segment, feature_name, ...",
        checks: [
          { label: "Joins users", pattern: "\\bjoin\\s+users\\b|\\busers\\b" },
          { label: "Groups by feature", pattern: "feature_name" },
          { label: "Counts users", pattern: "count\\s*\\(\\s*distinct" }
        ],
        solution: "select u.segment, fe.feature_name,\n  count(distinct fe.user_id) as adopting_users\nfrom feature_events fe\njoin users u on u.id = fe.user_id\ngroup by u.segment, fe.feature_name\norder by adopting_users desc;"
      }
    },
    {
      id: 22,
      phase: "Weeks 17-24: Real-World Mastery Projects",
      title: "Operations Analytics Project",
      level: "Data Commander",
      story: "Operations leaders need bottlenecks that can be fixed, not just averages.",
      visibleWin: "Expose process delays by stage.",
      lessons: ["Measure cycle time", "Compare stages", "Find bottlenecks"],
      review: ["Where does time accumulate?", "What average hides extremes?", "Which team owns the fix?"],
      challenge: {
        company: "OpsLine",
        prompt: "Calculate average processing hours by workflow stage.",
        schema: ["workflow_events(id, item_id, stage, started_at, completed_at)"],
        starter: "select stage, avg(...)",
        checks: [
          { label: "Groups by stage", pattern: "group\\s+by\\s+.*stage" },
          { label: "Uses average", pattern: "avg\\s*\\(" },
          { label: "Uses timestamps", pattern: "completed_at|started_at" }
        ],
        solution: "select stage,\n  avg(extract(epoch from (completed_at - started_at)) / 3600) as avg_processing_hours\nfrom workflow_events\ngroup by stage\norder by avg_processing_hours desc;"
      }
    },
    {
      id: 23,
      phase: "Weeks 17-24: Real-World Mastery Projects",
      title: "Data Quality Project",
      level: "Infinity Master",
      story: "The learner protects decision quality by finding missing, duplicate, and inconsistent data.",
      visibleWin: "Write a data quality audit query.",
      lessons: ["Find nulls", "Detect duplicates", "Report data quality risks"],
      review: ["What missing value changes a decision?", "Which duplicate is dangerous?", "How should quality be reported?"],
      challenge: {
        company: "TrustData",
        prompt: "Find email addresses used by more than one customer record.",
        schema: ["customers(id, full_name, email, created_at)"],
        starter: "select email, count(*) ...",
        checks: [
          { label: "Groups by email", pattern: "group\\s+by\\s+.*email" },
          { label: "Counts records", pattern: "count\\s*\\(" },
          { label: "Uses HAVING", pattern: "\\bhaving\\b" }
        ],
        solution: "select email, count(*) as record_count\nfrom customers\nwhere email is not null\ngroup by email\nhaving count(*) > 1\norder by record_count desc;"
      }
    },
    {
      id: 24,
      phase: "Weeks 17-24: Real-World Mastery Projects",
      title: "Infinity Capstone",
      level: "Infinity Master",
      story: "The final project turns SQL into a business recommendation with evidence, caveats, and next action.",
      visibleWin: "Deliver a decision-ready SQL analysis story.",
      lessons: ["Frame the business question", "Build the query chain", "Translate findings into action"],
      review: ["What decision is being made?", "What evidence supports it?", "What caveat should be stated?"],
      challenge: {
        company: "Infinity Board",
        prompt: "Build a query that summarizes revenue, active customers, and average order value by month.",
        schema: ["orders(id, customer_id, order_date, total_amount)"],
        starter: "select date_trunc('month', order_date) as month, ...",
        checks: [
          { label: "Groups by month", pattern: "date_trunc|month" },
          { label: "Sums revenue", pattern: "sum\\s*\\(\\s*total_amount\\s*\\)" },
          { label: "Counts customers", pattern: "count\\s*\\(\\s*distinct\\s+customer_id" },
          { label: "Calculates average order value", pattern: "avg\\s*\\(\\s*total_amount\\s*\\)|aov" }
        ],
        solution: "select date_trunc('month', order_date) as month,\n  sum(total_amount) as revenue,\n  count(distinct customer_id) as active_customers,\n  avg(total_amount) as average_order_value\nfrom orders\ngroup by date_trunc('month', order_date)\norder by month;"
      }
    }
  ]
};
