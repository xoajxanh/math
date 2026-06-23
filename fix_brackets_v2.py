with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the stray <> 
content = content.replace(
    '            {/* Sub Tab Switcher */}\n            <>\n',
    '            {/* Sub Tab Switcher */}\n'
)

# 2. Add closing </div> for animate-pop before closing english tab
# We need to find the end of english tab
# It's at:
#              )}
#            </section>
#          </>
#        )}
content = content.replace(
    '              )}\n            </section>\n\n          </>\n        )}\n\n        {activeTab === "timo" && (',
    '              )}\n            </section>\n            </div>\n          </>\n        )}\n\n        {activeTab === "timo" && ('
)

# 3. Remove the stray closing brackets at the end of activeTab === "timo"
content = content.replace(
    '                </section>\n              </div>\n            )}\n\n          </>\n        )}\n\n      </main>',
    '                </section>\n              </div>\n            )}\n\n      </main>'
)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Brackets fixed v2!")
